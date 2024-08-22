'use client'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"
import { Item } from '@/types';


// Mock data for garage sale items with multiple images
const items: Item[] = 
[
    {category:'Tech',name:'Fuente Seasonic CORE GM-650 650W 80 Plus Gold Semi Modular',description:'Seasonic CORE GM-650 650W 80 Plus Gold Semi Modular',images:['https://thumb.pccomponentes.com/w-530-530/articles/29/290673/seasonic-core-gm-650-650w-80-plus-gold-semi-modular-opiniones.jpg','https://ibb.co/3dSm1x9','https://i.ibb.co/Rjq0BrZ/IMG-8525.jpg'],id:0,price:70000},
    {category:'Tech',description:"Mouse Pad gamer Redragon Kunlun P006 de goma l 420mm x 880mm x 4mm negro/rojo",name:'Mouse Pad gamer Redragon Kunlun',images:['https://i.ibb.co/h7jWVV0/IMG-8530.jpg','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvfBi0isb1wCKaCCWSMAnpOCfFXL2Ig8_oHA&s'],id:1,price:15000},
    {category:'Tech',description:"Logitech G560 G Parlantes 2.1 Bluetooth Gamer RGB - 110V/220V - Negro",name:'Parlante RGB Logitech g560',images:['https://http2.mlstatic.com/D_NQ_NP_2X_887019-MLU78229907660_082024-F.webp','https://i.ibb.co/NFMcwJ3/IMG-8532.jpg'],id:2,price:300000},
    {category:'Tech',description:"Cámara web Logitech C922 Pro Full HD 30FPS color negro",name:'Camara web Logitech c922 Pro ',images:['https://i.ibb.co/kKsYDLY/IMG-8534.jpg'],id:3,price:90000},
    {category:'Tech',description:"",name:'Monitor Samsung F22T35 LED 22',images:['https://http2.mlstatic.com/D_NQ_NP_2X_843829-MLU72646996287_112023-F.webp'],id:4,price:140000},
    {category:'Tech',description:"Monitor Lenovo 23.8in Led Thinkvision Fhd Panel Ips T24i /vc",name:'Monitor Lenovo 24',images:['https://p3-ofp.static.pub/fes/cms/2023/01/18/9tnjy39k6a6na4c2t889lrn17iu6v8110472.png','https://i.ibb.co/pn9fz1x/IMG-8542.jpg','https://i.ibb.co/tpg8jVj/IMG-8539.jpg'],id:5,price:170000},
    {category:'Tech',description:"",name:'Brazo articulado monitor',images:[''],id:6,price:30000},
    {category:'Tech',description:"Pantalla Streaming Plegable El Gato Chroma Key Verde Screen",name:'Pantalla plegable El gato Chroma ',images:['https://http2.mlstatic.com/D_NQ_NP_2X_994840-MLA41829343436_052020-F.webp'],id:7,price:400000},
    {category:'Tech',description:"Standing Desk tiene un controlador que te permite ajustar rápida y fácilmente la altura deseada. La elección de 3 ajustes, de memorias programables significa que no hay necesidad de preocuparse por encontrar la altura correcta cada vez, simplemente tocas un botón y se desplaza a una de tus alturas favoritas. La solución perfecta para trabajar sentado o de pie en un espacio de trabajo verdaderamente ergonómico.",name:'Standing Desk Inpro ',images:['https://i.ibb.co/30nvMJM/Whats-App-Image-2024-08-08-at-17-23-57.jpg','https://i.ibb.co/8YjmkK3/Whats-App-Image-2024-08-08-at-17-23-38.jpg'],id:8,price:580000},
    {category:'Tech',description:"PS4 slim 500gb con 1 joystick",name:'Play Station 4 Slim 1tb',images:['https://http2.mlstatic.com/D_NQ_NP_2X_660640-MLA77336523296_072024-F.webp','https://http2.mlstatic.com/D_NQ_NP_2X_645515-MLA77552371075_072024-F.webp'],id:9,price:430000},
    {category:'Tech',description:"",name:'Placa madre',images:[''],id:10,price:70000},
    {category:'Tech',description:"",name:'Placa video msi rtx 3070',images:[''],id:11,price:400000},
    {category:'Tech',description:"",name:'Procesador + cooler',images:[''],id:12,price:150000},
    {category:'Tech',description:"",name:'32gb memoria ram',images:[''],id:15,price:80000},
    {category:'Tech',description:"",name:'Gabinete',images:[''],id:16,price:70000},
    {category:'Tech',description:"Soporte Para Audifonos Redragon Scepter Pro Ha300 Rgb Color Negro",name:'Soporte auriculares Redragon',images:['https://http2.mlstatic.com/D_NQ_NP_791517-MLC45485792753_042021-O.webp'],id:17,price:20000},
    {category:'Casa',description:"",name:'Sillon 3 cuerpos',images:[''],id:18,price:250000},
    {category:'Casa',description:"",name:'Mueble Rack Tv Melamina',images:[''],id:19,price:120000},
    {category:'Electrodomesticos',description:"Lavasecarropas Carga Frontal Lava 13 Kg. y Seca 9 kg.",name:'Lavasecarropas candy 13kg',images:['https://http2.mlstatic.com/D_NQ_NP_773340-MLA43864323086_102020-O.webp'],id:20,price:900000},
    {category:'Casa',description:"Mueble recibidor de melamina y madera con 3 puertas",name:'Mueble recibidor',images:[''],id:21,price:140000},
    // {category:'Tech',description:"",name:'auriculares hyperx',images:[''],id:22,price:70000},
    // {category:'Tech',description:"",name:'Silla gamer',images:[''],id:23,price:50000},
    {category:'Tech',description:"",name:'Drone DJI mini 2',images:[''],id:24,price:700000},
    
]

// Get unique categories from items
const categories = ["Todo",...new Set(items.map(item => item.category))]


export default function GarageSaleApp() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [sortOrder, setSortOrder] = useState<string>("asc");


  const filteredItems = selectedCategory && selectedCategory !== "Todo"
  ? items.filter((item) => item.category === selectedCategory)
  : items;

  const sortedItems = sortOrder === "asc"
    ? [...filteredItems].sort((a, b) => parseFloat(a.price.toString()) - parseFloat(b.price.toString()))
    : sortOrder === "desc"
    ? [...filteredItems].sort((a, b) => parseFloat(b.price.toString()) - parseFloat(a.price.toString()))
    : filteredItems;
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary">Venta por mudanza</h1>
        <p className="text-xl text-muted-foreground mt-2">Me estoy mudando asi que vendo varias cosas!</p>
      </header>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map(category => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer text-lg px-4 py-2"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
      <select
  value={sortOrder}
  onChange={(e) => setSortOrder(e.target.value)}
  className="mb-4 p-2 border rounded"
>
  <option value="default">Ordenar por defecto</option>
  <option value="asc">Precio: Menor a Mayor</option>
  <option value="desc">Precio: Mayor a Menor</option>
</select>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedItems
          .map(item => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="w-full h-48 relative">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">${item.price.toLocaleString('es-AR')}</p>
                    <p className="text-muted-foreground">{item.category}</p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{item.name}</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <Carousel className="w-full max-w-xs mx-auto">
                    <CarouselContent>
                      {item.images.map((image, index) => (
                        <CarouselItem key={index}>
                          <div className="w-full h-64 relative">
                            <Image
                              src={image}
                              alt={`${item.name} - View ${index + 1}`}
                              layout="fill"
                              objectFit="contain"
                              className="rounded-lg"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                  <div className="mt-4">
                    <p className="text-2xl font-bold mb-2">${item.price.toLocaleString('es-AR')}</p>
                    <p className="text-muted-foreground mb-4">{item.category}</p>
                    <p>{item.description}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
      </div>
    </div>
  )
}