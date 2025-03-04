"use client"

import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import content from "@contentJson"
import { animated } from "react-spring"
import Image from 'next/image'
import { Folders, Cake, History, Smile, Hourglass } from 'lucide-react'
import Heading from "@/lib/components/heading"


const StudioContent = () => {
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")

  const CATEGORY_ICONS = {
    project: Folders,
    creation: Cake,
    time: History,
    happy: Smile,
    year: Hourglass
  }

  return <section id="studio" className="py-24">
    <div className="container">
    <Heading tag='h2' content="L'histoire du studio" />
    <p className='mt-4 mb-12 text-md leading-8'>Créé en 2024 par David Marcos, le studio Shifty répond au besoin croissant des entreprises d’externaliser leur communication. Après plusieurs années en freelance comme graphiste et développeur web, j'ai constaté que répondre efficacement aux attentes des clients nécessitait non seulement du temps, mais surtout une expertise approfondie dans chaque domaine de la communication. C'est pourquoi je collabore en fonction des projets avec des experts dans leur domaine (graphistes, développeurs, vidéastes, etc.) pour offrir des services réactifs et des prestations de qualité supérieure.</p>
    <Heading tag='h2' content="Notre objectif" />
    <p className='mt-4 mb-12 text-md leading-8'>Le studio aspire à être ton partenaire de confiance pour développer ton image de marque sur le long terme. Chaque projet étant unique, on adopte une approche personnalisée, alliant soin et efficacité, pour garantir ta satisfaction. La confiance et la transparence sont au cœur de notre collaboration, avec pour objectif de rendre ta marque visible et performante.</p>
    <Heading tag='h2' content="Le studio en quelques chiffres" />
      <animated.div ref={animate} style={fade} className="grid grid-cols-3 gap-2 mt-4"> 
        {content.studio.items.map((item, index) => {
          const Icon = CATEGORY_ICONS[item.icon as keyof typeof CATEGORY_ICONS] || null;
          return (
            <div
              key={`studio-title-${index}`}
              className={`${index === 2 || index === 3 || index === 3 ? 'row-span-2' : ''} py-24 px-12 shadow-lg rounded-lg ${item.class} ${index === 10 ? 'col-span-3 shadow-none' : ''}`}
            >
              <div>
                {item.title ? <p className='mb-2'>{item.title}</p> : null}
                {item.value ? <p dangerouslySetInnerHTML={{ __html: item.value }} className={`${item.class} ${item.type === 'number' ? 'text-6xl' : 'text-lg'} ${item.picture ? 'mb-16' : ''}`} /> : null}
              </div>
              {item.picture ? <Image src={`/images/${item.picture}`} alt={item.title} style={{ width: '100%', height: 'auto' }} width={300} height={300} className="table mx-auto" /> : null}
              {item.icon ? <Icon size={100} className='opacity-[0.1]' /> : null}
            </div>
          )
        })}
      </animated.div>
    </div>
  </section>
}

export default StudioContent
