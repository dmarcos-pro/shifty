import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/lib/components/ui/drawer"
import content from "@contentJson"

// IMAGE
import logo from "@images/logo.png"
import { X } from "lucide-react"
import Image from "next/image"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-600 p-4">
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
          <Drawer>
            <DrawerTrigger className="text-xs">Mentions légales</DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Mentions légales</DrawerTitle>
                <DrawerDescription>
                  <p>
                    Le présent site est édité par David Marcos :
                    Auto-entrepreneur, immatriculé à l’URSSAF sous le numéro 520
                    141 136 00033, dont le siège social est situé au 23 avenue
                    Jacques Yves Cousteau à Vendargues (34740).
                  </p>
                  <h2>Propriété intellectuelle</h2>
                  <p>
                    Le présent site constitue une oeuvre protégée au titre de la
                    propriété intellectuelle. Il est la propriété exclusive de
                    David Marcos.
                  </p>
                  <p>
                    Il en est de même de sa structure générale, de son
                    arborescence, de ses formulaires et des textes figurant sur
                    le site, proposés en différents langages web (HTML, CSS,
                    ReactJS, NextJs).
                  </p>
                  <p>
                    Pour un meilleur confort d’utilisation et un graphisme plus
                    agréable, nous vous recommandons de recourir à des
                    navigateurs modernes comme Safari, Firefox, Google Chrome,
                    etc…
                  </p>
                  <p>
                    Toute reproduction, représentation, modification,
                    publication, transmission totales ou partielles du site ou
                    de son contenu, ou plus généralement toute exploitation non
                    autorisée par David Marcos du site et des informations qui y
                    sont diffusées constituent une contrefaçon sanctionnée par
                    les articles L.335-2 et suivants du Code de la propriété
                    intellectuelle et engage la responsabilité de l’Internaute
                    au sens des articles L. 713-2 et L.713-3 du Code de la
                    propriété intellectuelle.
                  </p>
                  <p>
                    Les visiteurs des sites internet ne peuvent mettre en place
                    un hyperlien en direction de ce site sans l’autorisation
                    préalable de David Marcos.
                  </p>
                  <p>
                    Dans l’hypothèse où un utilisateur ou visiteur souhaiterait
                    mettre en place un hyperlien en direction d’un des sites
                    internet de David Marcos, il lui appartiendra d’adresser un
                    email accessible sur le site afin de formuler sa demande de
                    mise en place d’un hyperlien. David Marcos se réserve le
                    droit d’accepter ou de refuser un hyperlien sans avoir à en
                    justifier sa décision.
                  </p>
                  <h2>Données personnelles</h2>
                  <p>
                    Vous pouvez visiter le site sans avoir à décliner votre
                    identité et/ou à fournir des informations personnelles vous
                    concernant.
                  </p>
                  <h2>Hébergement Société</h2>
                  <p>
                    OVH – SAS au capital de 10 069 020 € - RCS Lille Métropole
                    424 761 419 00045 - Code APE 2620Z - N° TVA : FR 22 424 761
                    419
                  </p>
                  <p>
                    Siège social : 2 rue Kellermann – 59100 Roubaix - France
                  </p>
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose className="absolute top-2 right-2">
                  <X />
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </footer>
  )
}

export default Footer
