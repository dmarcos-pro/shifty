"use client"
import { useState, useEffect } from 'react'
import { animated } from "react-spring"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import { useRouter } from 'next/router'
import SelectedService from "./selection"
import ContentServices from "./content"
import { fetchServices } from "@/api/index"
import { useQuery } from "react-query"
import { ServicesProps } from "@/type/component"
import content from "@contentJson"
import { PenTool, MousePointer2, Camera, X } from 'lucide-react'
import { Button } from '@/lib/components/ui/button'
import Service from "@/container/homepage/services/service"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/lib/components/ui/table'
import { CheckIcon, XIcon, PlusIcon, SmartphoneIcon } from 'lucide-react'
import Heading, { fontTitle } from '@/lib/components/heading'
import { LayoutGrid } from '@/lib/components/grid-modal'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/lib/components/ui/carousel'
import Head from 'next/head'
import { Accordion, AccordionItem, AccordionContent } from '@/lib/components/ui/accordion'
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import Link from "next/link"
import ExpandableCardDemo from "@/lib/components/ui/expendable-card"

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/lib/components/ui/tabs'


const ServicesContent = () => {
  const router = useRouter()
  const { cat } = router.query as { cat: string }
  const [serviceSelected, setServiceSelected] = useState<number>(0)
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")
  const [category, setCategory] = useState<'branding' | 'digital' | 'social_media' >('digital')
  const [monthly, setMonthly] = useState<boolean>(true)
  const [compareSubscription, setCompareSubscription] = useState<boolean>(false)

  const { data: services, isLoading, isError } = useQuery("services", () => fetchServices())
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching data...</div>
  

  const countAllContentTitles = (services: Record<string, any>) => {
    return Object.values(services).reduce((count, section) => {
      if (section.content && Array.isArray(section.content)) {
        count += section.content.length
      }
      return count;
    }, 0)
  }
  
  const TotalTitleCounter = ({ services }: {services: Record<string, any>}) => {
    return <span>{countAllContentTitles(services)}</span>
  }

  const selectService = (index: number) => () => {
    setServiceSelected(index)
  }

  const handleService = (index: number) => {

  }


  return <>
  <section id="subscription" className="mb-24">
    <div className="container">
        <ExpandableCardDemo cards={content.service.items.list} />
    </div>
  </section>
  {/* <section>
    <div className="container-sm">
      <Heading tag="h2" content="Notre processus" />
      <div className="grid gap-8 mt-8 border-l ml-8 pt-4">
        <div className='flex'>
          <div className='relative -left-5 bg-blue-100 rounded-50 p-2 w-[40px] h-[40px] flex items-center justify-center'>
            1
          </div>
          <div className='flex-1 pr-8'>
            <p className='font-bold'>Découverte et analyse</p>
            <p className='mt-2'>On commence par un brief pour comprendre ton activité, ta cible, tes valeurs et tes besoins, et on analyse tes concurrents pour identifier les opportunités de différenciation.</p>
          </div>
        </div>
        <div className='flex'>
          <div className='relative -left-5 bg-blue-100 rounded-50 p-2 w-[40px] h-[40px] flex items-center justify-center'>
            2
          </div>
          <div className='flex-1 pr-8'>
            <p className='font-bold'>Recherche et inspiration</p>
            <p className='mt-2'>On explore différentes pistes créatives en créant un moodboard pour définir une direction artistique en s’inspirant de tes idées et de notre expertise.</p>
          </div>
        </div>
        <div className='flex'>
          <div className='relative -left-5 bg-blue-100 rounded-50 p-2 w-[40px] h-[40px] flex items-center justify-center'>
            3
          </div>
          <div className='flex-1 pr-8'>
            <p className='font-bold'>Esquisses et concepts</p>
            <p className='mt-2'>On conçoit plusieurs propositions.</p>
          </div>
        </div>
        <div className='flex'>
          <div className='relative -left-5 bg-blue-100 rounded-50 p-2 w-[40px] h-[40px] flex items-center justify-center'>
            4
          </div>
          <div className='flex-1 pr-8'>
            <p className='font-bold'>Révisions et affinage</p>
            <p className='mt-2'>On recueille tes retours pour affiner et créer une version finale polyvalente.</p>
          </div>
        </div>
        <div className='flex'>
          <div className='relative -left-5 bg-blue-100 rounded-50 p-2 w-[40px] h-[40px] flex items-center justify-center'>
            5
          </div>
          <div className='flex-1 pr-8'>
            <p className='font-bold'>Livraison des fichiers</p>
            <p className='mt-2'>Une fois validé, on te fournit tous les fichiers nécessaires et on t’accompagne jusqu à 100% satisfaction.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="subscription" className="mt-12 mb-24">
    <div className="container">
      <Heading tag="h2" content="Offre digital (4)" />
      <div className="mt-8">
        <Carousel className=''>
          <CarouselContent>
            {content.services.items.digital.content.map((item: any, index: number) => (
              <CarouselItem key={index}>
                <div className='flex gap-8'>
                  <div className='flex-[7]'>
                    <Heading tag="h3" content={item.title} />
                    <p>{item.resume}</p>
                    <div className="grid gap-8 mt-8 border-l ml-8 pt-4">
                      {item.list[1].content.map((content: string, index: number) => (
                        <div key={index} className='flex'>
                          <div className='relative -left-5 bg-blue-100 rounded-50 p-2 w-[40px] h-[40px] flex items-center justify-center'>
                            {index + 1}
                          </div>
                          <div className='flex-1 pr-8'>
                            <p className='font-bold'>{content.title}</p>
                            <p className='mt-2'>{content.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='flex-[5]'>
                    <div className='border shadow-lg rounded-lg sticky top-0'>
                      {item.footer.map((content: any, index: number) => (<>
                        <div key={index} className='p-8 border-b'>
                          <p className='font-bold text-lg'>{content.title}</p>
                          <p className='text my-4'>{content.content}</p>
                          <Button className='rounded-md w-full'>Nous contacter</Button>
                        </div>                        
                        <div className="p-8 grid gap-4">
                          {item.list[0].title}
                          {item.list[0].content.map((content: string, index: number) => (
                            <div key={index} className='flex gap-4 text-sm'>
                              <CheckIcon className='text-green' />
                              <div className='flex-1'>
                                <p className='font-bold'>{content.title}</p>
                                <p className=''>{content.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                    </>))}
                    </div>
                  </div>
                </div>
              </CarouselItem>  
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  </section> */}
  {/* <section id="subscription" className="mt-12 mb-24">
    <div className="container-lg">
      <div className={`grid grid-cols-4 gap-4`}>
        <div className='bg-gradient-to-b from-blue-100 p-8 rounded-lg'>
          <Heading tag="h3" content="Tous nos abonnements" />
          <p className='text-sm my-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit numquam ex, necessitatibus.</p>
          <span 
            className='text-blue text-sm'
            onClick={() => setCompareSubscription(!compareSubscription)}
          >Voir le tableau des comparatifs</span>
        </div>
        {compareSubscription ? (
          <div className="col-span-3">
            <Table className='table-fixed'>
              <TableHeader>
                <TableRow className='border-none'>
                  <TableCell></TableCell>
                  <TableHead className="h-auto">
                    <p className={`text-lg ${fontTitle.className}`}>Offre Standard</p>
                    <p className='py-4'>Offre idéale pour les sites nécessitant une maintenance de base</p>
                    <p className='mb-4'>
                      <span className='text-xl'>100€</span>
                      <span className='mt-1 ml-1 text-xs uppercase'>/ mois</span>
                    </p>
                    <Button variant={'square'} className='w-full mt-4'>Se renseigner</Button>
                  </TableHead>
                  <TableHead className="h-auto">
                    <p className={`text-lg ${fontTitle.className}`}>Offre Premium</p>
                    <p className='py-4'>Offre idéale pour les sites nécessitant une maintenance régulière</p>
                    <p className='mb-4'>
                      <span className='text-xl'>300€</span>
                      <span className='mt-1 ml-1 text-xs uppercase'>/ mois</span>
                    </p>
                    <Button variant={'noBorder'} className='w-full mt-4 text-gray-400'>Bientôt disponible</Button>
                  </TableHead>
                  <TableHead className="h-auto">
                    <p className={`text-lg ${fontTitle.className}`}>Offre VIP</p>
                    <p className='py-4'>Offre idéale pour les sites nécessitant une maintenance avancée</p>
                    <p className='mb-4'>
                      <span className='text-xl'>400€</span>
                      <span className='mt-1 ml-1 text-xs uppercase'>/ mois</span>
                    </p>
                    <Button variant={'square'} className='w-full mt-4'>Se renseigner</Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableHead className="font-bold pt-6 pl-0 uppercase" colSpan={4}>Mise à jour</TableHead>
                  <TableRow>
                    <TableHead className='px-0'>Logiciels</TableHead>
                    <TableCell className="space-y-1 text-center">
                      <CheckIcon className="inline-flex stroke-emerald-600" size={16} aria-hidden="true" />
                      <span className="sr-only">Supported</span>
                    </TableCell>
                    <TableCell className="space-y-1 text-center">
                        <CheckIcon className="inline-flex stroke-emerald-600" size={16} aria-hidden="true" />
                      <span className="sr-only">Supported</span>
                    </TableCell>
                    <TableCell className="space-y-1 text-center">
                        <CheckIcon className="inline-flex stroke-emerald-600" size={16} aria-hidden="true" />
                      <span className="sr-only">Supported</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className='px-0'>Plugins</TableHead>
                    <TableCell className="space-y-1 text-center">
                      <CheckIcon className="inline-flex stroke-emerald-600" size={16} aria-hidden="true" />
                      <span className="sr-only">Supported</span>
                    </TableCell>
                    <TableCell className="space-y-1 text-center">
                      <CheckIcon className="inline-flex stroke-emerald-600" size={16} aria-hidden="true" />
                      <span className="sr-only">Supported</span>
                    </TableCell>
                    <TableCell className="space-y-1 text-center">
                      <CheckIcon className="inline-flex stroke-emerald-600" size={16} aria-hidden="true" />
                      <span className="sr-only">Supported</span>
                    </TableCell>
                  </TableRow>
                  <TableHead className="font-bold pt-6 pl-0 uppercase" colSpan={4}>Maintenance</TableHead>
                  <TableRow>
                    <TableHead className='px-0'>Analyse</TableHead>
                    <TableCell className="space-y-1 text-center">
                      <CheckIcon className="inline-flex stroke-emerald-600" size={16} aria-hidden="true" />
                      <span className="sr-only">Supported</span>
                    </TableCell>
                    <TableCell className="space-y-1 text-center">
                      <CheckIcon className="inline-flex stroke-emerald-600" size={16} aria-hidden="true" />
                      <span className="sr-only">Supported</span>
                    </TableCell>
                    <TableCell className="space-y-1 text-center">
                      <CheckIcon className="inline-flex stroke-emerald-600" size={16} aria-hidden="true" />
                      <span className="sr-only">Supported</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className='px-0'>Corrections</TableHead>
                    <TableCell className="space-y-1 text-center">
                      <CheckIcon className="inline-flex stroke-emerald-600" size={16} aria-hidden="true" />
                      <span className="sr-only">Supported</span>
                    </TableCell>
                    <TableCell className="space-y-1 text-center">
                      <CheckIcon className="inline-flex stroke-emerald-600" size={16} aria-hidden="true" />
                      <span className="sr-only">Supported</span>
                    </TableCell>
                    <TableCell className="space-y-1 text-center">
                      <CheckIcon className="inline-flex stroke-emerald-600" size={16} aria-hidden="true" />
                      <span className="sr-only">Supported</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className='px-0'>Rapport mensuel</TableHead>
                    <TableCell className="space-y-1 text-center">
                      <CheckIcon className="inline-flex stroke-emerald-600" size={16} aria-hidden="true" />
                      <span className="sr-only">Supported</span>
                    </TableCell>
                    <TableCell className="space-y-1 text-center">
                      <CheckIcon className="inline-flex stroke-emerald-600" size={16} aria-hidden="true" />
                      <span className="sr-only">Supported</span>
                    </TableCell>
                    <TableCell className="space-y-1 text-center">
                      <CheckIcon className="inline-flex stroke-emerald-600" size={16} aria-hidden="true" />
                      <span className="sr-only">Supported</span>
                    </TableCell>
                  </TableRow>
                  <TableHead className="font-bold pt-6 pl-0 uppercase" colSpan={4}>Communication</TableHead>
                  <TableRow>
                    <TableHead className='px-0'>Email</TableHead>
                    <TableCell className="space-y-1 text-center">
                      <CheckIcon className="inline-flex stroke-emerald-600" size={16} aria-hidden="true" />
                      <span className="sr-only">Supported</span>
                    </TableCell>
                    <TableCell className="space-y-1 text-center">
                      <CheckIcon className="inline-flex stroke-emerald-600" size={16} aria-hidden="true" />
                      <span className="sr-only">Supported</span>
                    </TableCell>
                    <TableCell className="space-y-1 text-center">
                      <CheckIcon className="inline-flex stroke-emerald-600" size={16} aria-hidden="true" />
                      <span className="sr-only">Supported</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className='px-0'>Téléphone</TableHead>
                    <TableCell className="space-y-1 text-center">
                      <XIcon className="inline-flex stroke-red-600" size={16} aria-hidden="true" />
                      <span className="sr-only">Not supported</span>
                    </TableCell>
                    <TableCell className="space-y-1 text-center">
                      <XIcon className="inline-flex stroke-red-600" size={16} aria-hidden="true" />
                      <span className="sr-only">Not supported</span>
                    </TableCell>
                    <TableCell className="space-y-1 text-center">
                      <CheckIcon className="inline-flex stroke-emerald-600" size={16} aria-hidden="true" />
                      <span className="sr-only">Supported</span>
                    </TableCell>
                  </TableRow>
                  <TableHead className="font-bold pt-6 pl-0 uppercase" colSpan={4}>Support technique</TableHead>
                  <TableRow>
                    <TableHead className='px-0'>Heures dédiées</TableHead>
                    <TableCell className="space-y-1 text-center">
                      <div>2h</div>
                    </TableCell>
                    <TableCell className="space-y-1 text-center">
                      <div>6h</div>
                    </TableCell>
                    <TableCell className="space-y-1 text-center">
                      <div>10h</div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className='px-0'>Demande urgente</TableHead>
                    <TableCell className="space-y-1 text-center">
                      <XIcon className="inline-flex stroke-red-600" size={16} aria-hidden="true" />
                      <span className="sr-only">Not supported</span>
                    </TableCell>
                    <TableCell className="space-y-1 text-center">
                      <CheckIcon className="inline-flex stroke-emerald-600" size={16} aria-hidden="true" />
                      <span className="sr-only">Supported</span>
                    </TableCell>
                    <TableCell className="space-y-1 text-center">
                      <CheckIcon className="inline-flex stroke-emerald-600" size={16} aria-hidden="true" />
                      <span className="sr-only">Supported</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead></TableHead>
                    <TableCell className="space-y-1 text-center">
                      <Button variant={'square'} className='w-full my-4'>Se renseigner</Button>
                    </TableCell>
                    <TableCell className="space-y-1 text-center">
                      <Button variant={'noBorder'} className='w-full my-4 text-gray-500'>M&apos;avertir</Button>
                    </TableCell>
                    <TableCell className="space-y-1 text-center">
                      <Button variant={'square'} className='w-full my-4'>Se renseigner</Button>
                    </TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </div>
        ) : (
          services.filter((service: ServicesProps) => service.monthly)
            .sort((a: ServicesProps, b: ServicesProps) => (a.order ?? 0) - (b.order ?? 0))
            .map((service: ServicesProps, index: number) => (
            <Service
                key={`service-${index}`}
                id={service.id}
                category={service.category}
                index={index}
                isNew={service.isNew}
                availability={service.availability}
                price={service.price}
                monthly={service.monthly}
                transition={false}
              />
          ))
        )}
      </div>
    </div>
  </section> */}
  <section id="services" className="mt-12 mb-24">
    {/* <div className='container mb-24 flex justify-center'>
      <button 
        onClick={() => setMonthly(true)}
        className={`text-lg p-16 ${monthly ? 'bg-blue-500 text-white' : 'text-gray-300'}`}
      >
        Je recherche une prestation (<TotalTitleCounter services={content.services.items} />)
      </button>
      <button 
        onClick={() => setMonthly(false)}
        className={`text-lg p-16 ${monthly ? 'text-gray-300' : 'bg-blue-500 text-white'}`}
      >
        Je souhaite souscrire à un abonnement
      </button>
    </div> */}

      {monthly ? (
        <div className="container flex gap-12 px-8">
          <animated.aside ref={animate} style={fade} className='flex-[3]'>
            <SelectedService
              category={category}
              setCategory={setCategory}
              cat={cat}
              serviceSelected={serviceSelected}
              setServiceSelected={setServiceSelected}
              monthly={monthly}
              />
          </animated.aside>
          <main className='flex-[9]'>
            <ContentServices 
              category={category}
              serviceSelected={serviceSelected}
              />
          </main>
        </div>
      ) : (
        <div className="container-sm">
          
        </div>
      )}
  </section></>
}

export default ServicesContent
