"use client"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import content from "@contentJson"
import Heading from "@lib/components/heading"
import { animated } from "react-spring"
import Task from '@/container/services/homepage/simulator/task'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/lib/components/ui/button'

const Simulator = () => {
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")
  const tasks = content.simulator.tasks
  const [category, setCategory] = useState('Tout')
  const [categoryList, setCategoryList] = useState<string[]>([])
  const [activeTask, setActiveTask] = useState<{id: string; name: string, price: number}[]>([])
  const [price, setPrice] = useState(0)

  useEffect(() => {
    const categories : string[] = [];
    tasks.map((item) => {
      if (!categories.includes(item.category)) {
        categories.push(item.category);
      }
      return categories;
    });
    setCategoryList(categories);
  }, [tasks]);

  const showFilter = (cat: string) => {
    setCategory(cat);
  }

  const toggleTask = (id: string, name: string, price: number) => {
    
    setActiveTask((prev) => {
      const exists = prev.some((task) => task.id === id);
      if (exists) {
        return prev.filter((task) => task.id !== id);
      } else {
        return [...prev, { id, name, price }];
      }
    });
    setPrice((prev) => {
      const exists = activeTask.some((task) => task.id === id);
      if (exists) {
        return prev - price;
      } else {
        return prev + price;
      }
    });
  };

  return (
    <section id="simulator" className="pb-48">
      <div className="container">
        <div className="text-center">
            <animated.div ref={animate} style={fade}>
                <span className="mb-3 block text-sm uppercase text-gray-400 dark:text-blue-300">
                    {content.simulator.tag}
                </span>
                <Heading 
                    tag="h2" 
                    content={content.simulator.title}
                />
                <p className='mt-4'>{content.simulator.content}</p>
            </animated.div>
        </div>
        <div className='flex mt-12'>
          <div className='flex-[2] mr-8'>
              <p className='mb-4'>Filtrer par catégorie</p>
              <div>
                  <div
                      className={`p-2 border-l-4 ${category === "Tout" ? "border-blue font-bold" : "border-white"}`}
                      onClick={(e) => { showFilter("Tout"); }}
                  >
                      Tous les services
                  </div>
                  {categoryList.map((item, index) => (
                      <div
                          key={index}
                          onClick={(e) => { showFilter(item); }}
                          className={`p-2 border-l-4 ${item === category ? "border-blue font-bold" : "border-white"}`}
                      >
                          {item}
                      </div>
                  ))}
              </div>
          </div>
          <div className='flex-[7]'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map((item, index: number) => (
                <Task
                  key={`task-` + index}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                  category={item.category}
                  update={toggleTask}
                  disabled={category === item.category || category === 'Tout' ? true : false}
                />
              ))}
            </div>
          </div>
          <div className='flex-[3] ml-8'>
            <p className='mb-8 text-md font-bold'>Récapitulatif {activeTask.length > 0 && `• ${activeTask.length} service${activeTask.length > 1 ? 's' : ''} `}</p>
            {activeTask.length === 0 && <>
              <p className="mb-8">Tu n&apos;as encore rien sélectionné !</p>
            </>}
            {activeTask.map((item) => (
              <div 
                key={item.id} 
                className='p-2 rounded border border-gray-600 mb-2 justify-between flex items-center'
              >
                <span>{item.name}</span>
                <span className='text-sm'>{item.price}€</span>
              </div>
            ))}
            {price > 0 && <>
              <div className='my-8 grid gap-4 text-sm'>
                <p className='flex justify-between'>
                  <span className='font-bold '>Total HT</span>{price}€
                </p>
                <p className='flex justify-between'>
                  <span className='font-bold'>TVA 20%</span>{price * .2}€
                </p>
                <p className='flex justify-between text-md font-bold'>
                  <span>Total TTC</span>{price + (price * .2)}€
                </p>
              </div>
              <hr className="border-gray-300" />
              <p className='mt-8 font-bold'>Informations :</p>
              <p className='mt-2'>{content.simulator.info}</p>
              <Button asChild className="mt-8">
                <Link href={`mailto:${content.contact.url}`}>Demande de devis personnalisé</Link>
              </Button>
            </>
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default Simulator