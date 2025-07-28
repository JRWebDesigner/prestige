'use client'

import { useState, useEffect } from "react"
import { getPerfumes } from "@/lib/sanity"
import type { SanityPerfume } from "@/types/perfume"
import PerfumeCardKit from "@/components/PerfumeCardKit"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Plus, Minus, ShoppingCart, Trash2, Gift, X } from "lucide-react" // Agregado X icon
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

// Actualizar la interfaz ComboItem para usar SanityPerfume
interface ComboItemUpdated {
  perfume: SanityPerfume
  quantity: number
  selectedSize: string
}

export default function CombosPage() {
  const [comboItems, setComboItems] = useState<ComboItemUpdated[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [perfumes, setPerfumes] = useState<SanityPerfume[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const perfumesPerPage = 10

  // Cargar perfumes desde Sanity
  useEffect(() => {
    const loadPerfumes = async () => {
      setLoading(true)
      setError(null)
      try {
        const allPerfumes = await getPerfumes()
        setPerfumes(allPerfumes)
      } catch (error) {
        console.error("Error loading perfumes:", error)
        setError("Error al cargar los perfumes. Intenta recargar la página.")
      } finally {
        setLoading(false)
      }
    }

    loadPerfumes()
  }, [])

  const addToCombo = (perfume: SanityPerfume, selectedSize: string) => {
    setComboItems((prevItems) => {
      // CORRECCIÓN: Usar id en lugar de _id
      const existingIndex = prevItems.findIndex(
        (item) => item.perfume.id === perfume.id && item.selectedSize === selectedSize
      )

      if (existingIndex !== -1) {
        const updatedItems = [...prevItems]
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + 1,
        }
        return updatedItems
      } else {
        const newItem: ComboItemUpdated = {
          perfume,
          quantity: 1,
          selectedSize: selectedSize,
        }
        return [...prevItems, newItem]
      }
    })
  }

  const removeFromCombo = (perfumeId: string, selectedSize: string) => {
    setComboItems((prev) =>
      prev.filter((item) => 
        !(item.perfume.id === perfumeId && item.selectedSize === selectedSize)
      )
    )
  }

  // FUNCIÓN PARA VACIAR EL KIT
  const clearCombo = () => {
    setComboItems([]);
  }

  const updateQuantityBySize = (perfumeId: string, selectedSize: string, change: number) => {
    setComboItems((prev) => {
      return prev
        .map((item) => {
          // CORRECCIÓN: Usar id en lugar de _id
          if (item.perfume.id === perfumeId && item.selectedSize === selectedSize) {
            const newQuantity = item.quantity + change
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
          }
          return item
        })
        .filter((item) => item.quantity > 0)
    })
  }

  const calculateTotals = () => {
    const subtotal = comboItems.reduce((sum, item) => {
      const sizeData = item.perfume.sizes.find((s) => s.size === item.selectedSize) || item.perfume.sizes[0]
      return sum + sizeData.price * item.quantity
    }, 0)
    const itemCount = comboItems.reduce((sum, item) => sum + item.quantity, 0)

    let discount = 0
    if (itemCount >= 2) discount = 0.05
    if (itemCount >= 3) discount = 0.1
    if (itemCount >= 4) discount = 0.15

    const discountAmount = subtotal * discount
    const total = subtotal - discountAmount

    return { subtotal, discount, discountAmount, total, itemCount }
  }

  const handleBuyCombo = () => {
    if (comboItems.length === 0) return

    const totals = calculateTotals()
    const itemsList = comboItems
      .map(
        (item) =>
          `• ${item.perfume.name} - ${typeof item.perfume.brand === 'string' ? item.perfume.brand : item.perfume.brand?.name} (${item.selectedSize}) (${item.quantity}x) - Bs. ${(item.perfume.sizes.find((s) => s.size === item.selectedSize)?.price || 0) * item.quantity}`
      )
      .join("\n")

    const message = `¡Hola! Quiero comprar este combo de perfumes:

*COMBO PERSONALIZADO*
${itemsList}

*RESUMEN:*
Subtotal: Bs. ${totals.subtotal}
Descuento (${(totals.discount * 100).toFixed(0)}%): -Bs. ${totals.discountAmount.toFixed(2)}
*TOTAL: Bs. ${totals.total.toFixed(2)}*

Total de productos: ${totals.itemCount}

¿Está disponible y puedo proceder con la compra?`

    const whatsappUrl = `https://wa.me/59175850708?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  // Filtrar perfumes basado en categoría y disponibilidad
  const filteredPerfumes = perfumes.filter((perfume) => {
    if (!perfume.inStock) return false

    if (selectedCategory === "all") return true

    // Normalizar categorías para comparación insensible a mayúsculas/minúsculas
    const perfumeCategory = perfume.category?.toLowerCase()?.trim()
    const selected = selectedCategory.toLowerCase().trim()

    return perfumeCategory === selected
  })

  // Paginación
  const indexOfLastPerfume = currentPage * perfumesPerPage
  const indexOfFirstPerfume = indexOfLastPerfume - perfumesPerPage
  const currentPerfumes = filteredPerfumes.slice(indexOfFirstPerfume, indexOfLastPerfume)
  const totalPages = Math.ceil(filteredPerfumes.length / perfumesPerPage)

  // Cambiar página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  // Resetear a página 1 cuando cambia el filtro
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory])

  const totals = calculateTotals()

  // Función helper para obtener la URL de la imagen
  const getImageUrl = (image: any) => {
    if (typeof image === "string") return image
    if (image?.asset?.url) return image.asset.url
    if (image?.url) return image.url
    return "/placeholder.svg?height=60&width=60"
  }

  // Función para obtener el nombre de la marca
  const getBrandName = (brand: any) => {
    return typeof brand === 'string' ? brand : brand?.name || 'Marca desconocida';
  }

  // Manejar estados de carga y error
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-black mb-4">Arma tu Kit Perfecto</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Selecciona múltiples perfumes y obtén descuentos especiales...
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <Skeleton className="h-8 w-40" />
                <Skeleton className="h-10 w-40" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="border rounded-lg p-4">
                    <div className="flex gap-4">
                      <Skeleton className="h-24 w-24 rounded-md" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-10 w-full mt-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <Skeleton className="h-96 rounded-xl" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="text-red-500 mb-4">
            <p className="text-lg font-semibold">Error al cargar los datos</p>
            <p className="text-sm mt-2">{error}</p>
          </div>
          <Button onClick={() => window.location.reload()} className="bg-black text-white hover:bg-gray-800">
            Recargar página
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Arma tu Kit Perfecto</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Selecciona múltiples perfumes y obtén descuentos especiales. Mientras más perfumes agregues, mayor será tu
            ahorro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-2 border-gray-200">
            <CardContent className="p-4 text-center">
              <Gift className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <h3 className="font-semibold text-black">2+ Perfumes</h3>
              <p className="text-sm text-gray-600">5% de descuento</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-black">
            <CardContent className="p-4 text-center">
              <Gift className="w-8 h-8 text-black mx-auto mb-2" />
              <h3 className="font-semibold text-black">3+ Perfumes</h3>
              <p className="text-sm text-gray-600">10% de descuento</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-gray-200">
            <CardContent className="p-4 text-center">
              <Gift className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <h3 className="font-semibold text-black">4+ Perfumes</h3>
              <p className="text-sm text-gray-600">15% de descuento</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-black">Selecciona tus Perfumes</h2>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
              >
                <option value="all">Todas las categorías</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>

            {filteredPerfumes.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">No hay perfumes disponibles</p>
                <p className="text-sm text-gray-400 mt-1">Intenta con otra categoría o recarga la página</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentPerfumes.map((perfume) => (
                    <PerfumeCardKit 
                      key={perfume.id} 
                      perfume={perfume} 
                      onAddToCombo={addToCombo} 
                    />
                  ))}
                </div>

                {/* Paginación */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8 space-x-2">
                    <Button
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      variant="outline"
                    >
                      Anterior
                    </Button>

                    <div className="flex items-center">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          onClick={() => paginate(page)}
                          variant={currentPage === page ? "default" : "outline"}
                          className={`mx-1 ${currentPage === page ? "bg-black text-white" : ""}`}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>

                    <Button
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      variant="outline"
                    >
                      Siguiente
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border-2 border-gray-200">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      <span>Mi Kit ({comboItems.reduce((acc, item) => acc + item.quantity, 0)})</span>
                    </CardTitle>
                    
                    {/* Botón para vaciar el kit */}
                    {comboItems.length > 0 && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={clearCombo}
                        className="text-red-500 hover:bg-red-50"
                        title="Vaciar kit"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {comboItems.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Gift className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500">Tu Kit está vacío</p>
                      <p className="text-sm text-gray-400 mt-1">Agrega perfumes para comenzar</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {comboItems.map((item) => (
                        <div
                          key={`${item.perfume.id}-${item.selectedSize}`}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <Image
                            src={getImageUrl(item.perfume.image) || "/placeholder.svg"}
                            alt={item.perfume.name}
                            width={60}
                            height={60}
                            className="rounded-md object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm text-black truncate">{item.perfume.name}</h4>
                            <p className="text-xs text-gray-600">{getBrandName(item.perfume.brand)}</p>
                            <p className="text-xs text-gray-500">{item.selectedSize}</p>
                            <p className="text-sm font-bold text-black">
                              Bs.{" "}
                              {(item.perfume.sizes.find((s) => s.size === item.selectedSize)?.price || 0) *
                                item.quantity}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              // CORRECCIÓN: Usar id en lugar de _id
                              onClick={() => updateQuantityBySize(item.perfume.id, item.selectedSize, -1)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              // CORRECCIÓN: Usar id en lugar de _id
                              onClick={() => updateQuantityBySize(item.perfume.id, item.selectedSize, 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              // CORRECCIÓN: Usar id en lugar de _id
                              onClick={() => removeFromCombo(item.perfume.id, item.selectedSize)}
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal:</span>
                          <span>Bs. {totals.subtotal}</span>
                        </div>
                        {totals.discount > 0 && (
                          <div className="flex justify-between text-sm text-green-600">
                            <span>Descuento ({(totals.discount * 100).toFixed(0)}%):</span>
                            <span>-Bs. {totals.discountAmount.toFixed(2)}</span>
                          </div>
                        )}
                        <Separator />
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span>Bs. {totals.total.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          onClick={clearCombo}
                          variant="outline"
                          className="border-red-500 text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Vaciar Kit
                        </Button>
                        
                        <Button
                          onClick={handleBuyCombo}
                          className="bg-black text-white hover:bg-gray-800"
                          size="lg"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Comprar Kit
                        </Button>
                      </div>

                      {totals.itemCount >= 2 && (
                        <div className="text-center">
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            ¡Ahorraste Bs. {totals.discountAmount.toFixed(2)}!
                          </Badge>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
