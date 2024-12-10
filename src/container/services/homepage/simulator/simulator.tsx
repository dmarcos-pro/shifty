"use client"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import content from "@contentJson"
import Heading from "@lib/components/heading"
import { animated } from "react-spring"
import Task from '@/container/services/homepage/simulator/task'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/lib/components/ui/button'
import { Send, MessageCircleMore, CornerDownRight } from "lucide-react"

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
        <div className="flex gap-2 items-center justify-center my-8">
          <Button
            variant={category === "Tout" ? 'default' : 'outlineLight'}
            size="sm"
            className={`uppercase text-xs`}
            onClick={(e) => { showFilter("Tout"); }}
            >
            Tous les services
          </Button>
          {categoryList.map((item, index) => (
            <Button
              key={index}
              variant={item === category ? 'default' : "outlineLight"}
              size="sm"
              className={`uppercase text-xs`}
              onClick={(e) => { showFilter(item); }}
            >
              {item}
            </Button>
          ))}
        </div>
        <div className='flex'>
          <div className='flex-[9]'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.filter((item) => item.enabled).map((item, index: number) => (
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
          <div className='flex-[3] ml-8 px-8'>
            <p className='text-md font-bold mb-4'>Récapitulatif</p>
            {activeTask.length === 0 ? 
              <p className="text-sm">Tu n&apos;as encore rien sélectionné !</p>
            : activeTask.map((item) => (
              <div
                key={item.id}
                className='mt-2 text-sm justify-between flex items-center'
              >
                <span className='flex'>
                  <CornerDownRight size={16} className='mr-1' />
                  <span>{item.name}</span>
                </span>
                <span className='text-sm'>{item.price} €</span>
              </div>  
            ))}
            {activeTask.length !== 0 && <hr className="border-gray-300 dark:border-gray-700 my-4" />}
            {price > 0 && <>
              <div className='grid gap-2 text-sm'>
                <p className='flex justify-between'>
                  <span className=''>Total HT</span>{price} €
                </p>
                <p className='flex justify-between'>
                  <span className=''>TVA 20%</span>{price * .2} €
                </p>
                <p className='flex justify-between font-bold'>
                  <span>Total TTC</span>{price + (price * .2)} €
                </p>
              </div>
              <hr className="border-gray-300 dark:border-gray-700 my-4" />
              <p className='font-bold text-sm'>Informations :</p>
              <p className='mt-2 text-sm '>{content.simulator.info}</p>
              <div className="flex gap-2 mt-8">
                <Button asChild size="sm">
                  <Link href={`mailto:${content.contact.url}`}>
                    <Send size={16} className='mr-1' />
                    Mail
                  </Link>
                </Button>
                <Button asChild size="sm" variant="green">
                  <Link href={`mailto:${content.contact.url}`}>
                    <MessageCircleMore size={18} className='mr-1' />
                    Whatsapp
                  </Link>
                </Button>
              </div>
            </>
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default Simulator