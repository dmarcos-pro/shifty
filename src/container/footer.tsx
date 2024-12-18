"use client"
import { fetchServices } from "@/api/index"
import { useQuery } from "react-query"
import content from "@contentJson"
import { type ServicesProps } from "@/type/component"
import Link from "next/link"
import { Button } from "@/lib/components/ui/button"
import { Instagram, Linkedin, Send, MessageCircleMore } from "lucide-react"

// IMAGE
import logo from "@images/logo.png"
import Image from "next/image"

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { data: services, isLoading, isError} = useQuery("services", () => fetchServices());
  
  return (
    <footer className="border-t dark:border-gray-600 py-12">
      <div className="container">  
        <aside className='flex gap-12'>
          <div className='flex-1'>
            <Link href="/">
              <Image
                width={120}
                height={80}
                style={{ width: "100px", height: "auto" }}
                src={logo.src}
                alt={`logo-${content.short_name}`}
              />
            </Link>
            <p
              className="mt-4"
              dangerouslySetInnerHTML={{ __html: content.baseline }}
            />
          </div>
          <div className='flex-none flex justify-end gap-12'>
            <div className='text-sm'>
              <p className='font-bold mb-2 text-base'>Nos services</p>
              <ul>
                {services && services.filter((service: ServicesProps) => !service.monthly).map((service: ServicesProps, index: number) => (
                  <li key={`footer-services-${index}`} className='py-1'>
                    <Link href={`/services?cat=${service.id}`}>{service.category}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className='text-sm'>
              <p className='font-bold mb-2 text-base'>Nos abonnements</p>
              <ul>
                {services && services.filter((service: ServicesProps) => service.monthly).map((service: ServicesProps, index: number) => (
                  <li key={`footer-abonnement-${index}`} className='py-1'>
                    {service.category}
                  </li>
                ))}
              </ul>
            </div>
            <div className='text-sm'>
              <p className='font-bold mb-2 text-base'>Le studio</p>
              <ul>
                <li className='py-1'>Qui sommes-nous ?</li>
                <li className='py-1'>Cookies</li>
                <li className='py-1'>Mentions légales</li>
                <li className='py-1'>CGV</li>
              </ul>
              <p className='text-sm flex my-4 gap-2'>
                <Instagram size={16} />
                <Instagram size={16} />
                <Instagram size={16} />
                <Instagram size={16} />
              </p>
            </div>
          </div>
        </aside>
        <div className='flex justify-between items-center gap-4 pt-8 mt-8 border-t dark:border-gray-600'>
          <p className='mt-2 text-sm'>{content.name} © 2012 - {currentYear}</p>
          <div className='gap-4 flex'>
            <Button asChild>
              <Link href={`mailto:${content.contact.url}`}>
                <Send size={16} className='mr-1' />
                Mail
              </Link>
            </Button>
            <Button asChild variant="green">
              <Link href={`mailto:${content.contact.url}`}>
                <MessageCircleMore size={18} className='mr-1' />
                Whatsapp
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer






{/* <Dialog>
  <DialogTrigger>
    <p className="text-xs">Mentions légales</p>
  </DialogTrigger>
  <DialogContent className="bg-white py-12 px-10 max-w-2xl">
    <DialogHeader>
      <DialogTitle className="font-title leading-8 dark:text-deepblue">
        Mentions légales
      </DialogTitle>
      <DialogClose asChild>
        <X className="text-primary absolute top-[6px] z-10 right-3 cursor-pointer" />
      </DialogClose>
      <DialogDescription className="font-title leading-5 dark:text-deepblue">
        <p>
          Le présent site est édité par David Marcos :
          Auto-entrepreneur, immatriculé à l’URSSAF sous le numéro 520
          141 136 00033, dont le siège social est situé au 23 avenue
          Jacques Yves Cousteau à Vendargues (34740).
        </p>
        <p className="mt-4">
          Le présent site constitue une oeuvre protégée au titre de la
          propriété intellectuelle. Il est la propriété exclusive de
          David Marcos. Toute reproduction, représentation,
          modification, publication, transmission totales ou
          partielles du site ou de son contenu, ou plus généralement
          toute exploitation non autorisée par David Marcos du site et
          des informations qui y sont diffusées constituent une
          contrefaçon sanctionnée par les articles L.335-2 et suivants
          du Code de la propriété intellectuelle et engage la
          responsabilité de l’Internaute au sens des articles L. 713-2
          et L.713-3 du Code de la propriété intellectuelle.
        </p>
        <p className="mt-4">
          OVH – SAS au capital de 10 069 020 € - RCS Lille Métropole
          424 761 419 00045 - Code APE 2620Z - N° TVA : FR 22 424 761
          419
        </p>
        <p>
          Siège social : 2 rue Kellermann – 59100 Roubaix - France
        </p>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog> */}