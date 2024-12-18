import content from "@contentJson"
import { Sparkles } from 'lucide-react'

import { Button } from "@/lib/components/ui/button"
import Link from 'next/link'
import { Send, MessageCircleMore } from 'lucide-react'
import Heading from "@/lib/components/heading"

type ContentServicesProps = {
  category: 'branding' | 'digital' | 'social_media';
  serviceSelected: number;
}

const ContentServices = ({ 
  category, 
  serviceSelected
}: ContentServicesProps) => {
  return (
    <article>
      <header>
        <div className="flex gap-4 items-center">
          <span className="p-2 rounded border bg-blue text-white">
            <Sparkles size={30} />
          </span>
          <Heading tag='h2' content={content.services.items[category].content[serviceSelected].title} />
        </div>
        <p className='mt-4'>
          {content.services.items[category].content[serviceSelected].resume}
        </p>
      </header>
      <hr className='my-8 border-gray-200 dark:border-gray-600' />
      {content.services.items[category].content[serviceSelected].list.map((item, index) => (
        <div key={`service-selected-${index}`} className={`${index > 0 ? 'mt-8' : ''}`}>
          <p className='text-md'>{index +1}. {item.title}</p> 
          <ul>
            {item.content.map((list, i) => (
              <li key={`service-list-item-${i}`} className='flex items-start gap-2 mt-4'>
                <Sparkles size={15} className='relative top-1 text-gray-400' />
                <span dangerouslySetInnerHTML={{ __html: list }} className='flex-1' />
              </li>
            ))}
          </ul>
        </div>
      ))}
      <hr className='my-8 border-gray-200 dark:border-gray-600' />
      <footer className='flex items-end gap-8'>
        {content.services.items[category].content[serviceSelected].footer.map((footer, index) => (
          <div key={`service-footer-${index}`}>
            {footer.title && <Heading tag='h3' content={footer.title} />}
            <p key={index} className='mt-4'>{footer.content}</p>
          </div>
        ))}
        <div className='gap-2 flex'>
          <Button asChild size='sm'>
            <Link href={`mailto:${content.contact.url}`}>
              <Send size={16} className='mr-1' />
              Mail
            </Link>
          </Button>
          <Button asChild size='sm' variant="green">
            <Link href={`mailto:${content.contact.url}`}>
              <MessageCircleMore size={18} className='mr-1' />
              Whatsapp
            </Link>
          </Button>
        </div>
      </footer>
    </article>
  )
}

export default ContentServices