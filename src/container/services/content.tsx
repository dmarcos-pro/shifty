import { useState, useEffect } from 'react'
import content from "@contentJson"
import { animated } from "react-spring"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import { Check, Sparkles } from 'lucide-react'

import { Button } from "@/lib/components/ui/button"
import Link from 'next/link'
import { Send, MessageCircleMore } from 'lucide-react'
import Heading from "@/lib/components/heading"
import { Card, CardTitle, CardHeader, CardContent } from "@/lib/components/ui/card"
import { Switch } from '@/lib/components/ui/switch'

type ContentServicesProps = {
  category: 'branding' | 'digital' | 'social_media';
  serviceSelected: number;
}

const ContentServices = ({ 
  category, 
  serviceSelected
}: ContentServicesProps) => {

  const DataIncrementer = ({startValue, endValue, delay }: { startValue: number, endValue: number, delay: number }) => {
    const [value, setValue] = useState<number>(startValue)

    useEffect(() => {
      const interval = setInterval(() => {
        setValue((prevValue) => {
          if (prevValue < endValue) {
            return prevValue + 1
          } else {
            clearInterval(interval)
            return prevValue
          }
        })
      }, delay)

      return () => clearInterval(interval)
    }, [endValue, delay])

    return <span>{value}</span>
  }

  const [contentDisplay, setContentDisplay] = useState<boolean>(true)

  const handleContent = (value: boolean) => {
    setContentDisplay(value)
  }
  
  return <article>
    <header className=''>
      <div className='flex justify-between items-center'>
        <Heading tag='h2' content={content.services.items[category].content[serviceSelected].title} />
        <div className="flex gap-2 items-center">
          <p className="text-sm">Description complète</p>
          <Switch checked={contentDisplay} onCheckedChange={handleContent} />
        </div>
      </div>
      <p className='mt-8'>
        {content.services.items[category].content[serviceSelected].resume}
      </p>
    </header>
    <div className={`my-8`}>
      {content.services.items[category].content[serviceSelected].list.map((item, index) => (
          <div key={`service-list-${index}`} className='mt-8'>
            <Heading tag="h3" content={item.title} />
            <ul className='mt-4 border-l py-2'>
              {item.content.map((list, i) => (
                <li key={`service-list-item-${i}`} className={`flex items-start ${i !== 0 ? 'mt-4' : 'mt-0'}`}>
                  {/* <span className='flex items-start gap-2'> */}
                    <span className='relative -left-3 bg-white rounded-50 p-1 border'>
                      <Check size={15} className='text-green-600' />
                    </span>
                    <span className='flex-1'>
                    {/* <span> */}
                      <span dangerouslySetInnerHTML={{ __html: list.title }} className="block mb-1" />
                      {contentDisplay ? <span dangerouslySetInnerHTML={{ __html: list.text }} className='text-gray-600' /> : ''}
                    </span>
                  {/* </span> */}
                </li>
              ))}
            </ul>
          </div>
      ))}
    </div>
    <aside className='bg-blue p-16 my-16 mx-32 rounded text-white'>
      {content.services.items[category].content[serviceSelected].footer.map((footer, index) => (
        <div key={`service-footer-${index}`} className='text-center'>
          {footer.title && <Heading tag='h3' content={footer.title} />}
          <p key={index} className='mt-4'>{footer.content}</p>
        </div>
      ))}
      <div className='gap-2 flex mt-4 justify-center'>
        <Button asChild size='sm' variant={'outlineDark'}>
          <Link href={`mailto:${content.contact.url}`}>
            <Send size={16} className='mr-1' />
            Mail
          </Link>
        </Button>
        <Button asChild size='sm' variant={'outlineDark'} className='hover:text-green'>
          <Link href={`mailto:${content.contact.url}`}>
            <MessageCircleMore size={18} className='mr-1' />
            Whatsapp
          </Link>
        </Button>
      </div>
    </aside>
    {content.services.items[category].content[serviceSelected].fun_fact.length > 1 && (
      <footer>
        <Heading tag="h3" content="Fun fact" />
        <div className="flex gap-4 mt-4">
          {content.services.items[category].content[serviceSelected].fun_fact.map((fact, index) => (
            <div key={`funfact-${index}`}>
              <Card className='p-8 hover:border-gray'>
                <CardContent>
                  <div className="mb-1 text-md">
                    <DataIncrementer startValue={fact.start} endValue={fact.end} delay={50} />
                  </div>              
                  <p>{fact.title}</p>
                  <p className='text-gray-400'>{fact.result}</p>
                    
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </footer>
    )}
  </article>
}

export default ContentServices