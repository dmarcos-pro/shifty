import content from "@contentJson"

// IMAGE
import logo from "@images/logo.png"
import Image from "next/image"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/components/ui/dialog"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t dark:border-gray-600 p-4">
      <div className="container">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              width={120}
              height={80}
              style={{ width: "100px", height: "auto" }}
              src={logo.src}
              alt={`logo-${content.short_name}`}
            />
            <p className="text-xs">© 2023 - {currentYear}</p>
          </div>
          <Dialog>
            <DialogTrigger>Mentions légales</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-title leading-8 text-white">
                  Mentions légales
                </DialogTitle>
                <DialogDescription className="font-title leading-5 text-white">
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
          </Dialog>
        </div>
      </div>
    </footer>
  )
}

export default Footer
