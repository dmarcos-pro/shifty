import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@lib/components/ui/select"
import { type ServicesProps } from "@/type/component"
import content from "@contentJson"
import { useEffect } from 'react'
import { fetchServices } from "@/api/index"
import { useQuery } from "react-query"
import { Sparkles } from 'lucide-react'

type SelectedServicesProps = {
  category: 'branding' | 'digital' | 'social_media';
  cat: string;
  setCategory: (id: 'branding' | 'digital' | 'social_media') => void;
  setServiceSelected: (index: number) => void;
  serviceSelected: number;
}

const SelectedService = ({
  category,
  cat,
  setCategory,
  setServiceSelected,
  serviceSelected
}: SelectedServicesProps) => {
  const { data: services, isLoading, isError } = useQuery("services", () => fetchServices())
  
  
  useEffect(() => {
    if (cat && ['branding', 'digital', 'social_media'].includes(cat as string)) {
      setCategory(cat as 'branding' | 'digital' | 'social_media');
    }
  }, [cat, setCategory]);
  
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching data...</div>

  const selectService = (index: number) => () => {
    setServiceSelected(index)
  }

  const handleService = (id: 'branding' | 'digital' | 'social_media') => {
    setCategory(id)
    setServiceSelected(0)
  }
  
  const TruncateText = ({ text, length }: { text: string, length: number }) => {
    if (text.length <= length) return text;
    
    const truncated = text.slice(0, length);
    const lastSpaceIndex = truncated.lastIndexOf(" ");
    
    return lastSpaceIndex > 0 
    ? truncated.slice(0, lastSpaceIndex) + " ..." 
    : truncated + " ...";
  }
  const CATEGORY_LABELS: Record<string, string> = {
    branding: "Branding",
    digital: "Digital",
    social_media: "Social Media",
  }

  return (
    <>
      <header className='flex gap-4 mb-6 items-center justify-between'>
        <div>
          <p>Quel est ton projet&nbsp;?</p>
          <p className='text-xs'>{content.services.items[category].content.length} services</p>
        </div>
        <div className="flex-none">
          <Select
              value={category}
              onValueChange={(value: 'branding' | 'digital' | 'social_media') => handleService(value)}
          >
            <SelectTrigger>
              Filtre : <SelectValue placeholder={CATEGORY_LABELS[category]} />
            </SelectTrigger>
            <SelectContent>
              {services && services.filter((service: ServicesProps) => !service.monthly).map((service: ServicesProps, index: number) => (
                  <SelectItem
                  key={`select-service-${index}`}
                  value={service.id}
                  className={`${category === service.id ? '' : 'text-gray-400'}`}
                  >
                  {service.category}
                  </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>
      {content.services.items[category].content.map((service, index: number) => (
        <div
          key={`services-${index}`} 
          className={`${serviceSelected === index ? 'border-blue dark:border-blue-400' : 'border-gray-200 dark:border-gray-500 hover:border-gray-400'} mt-4 bg-white dark:bg-gray-700 p-4 rounded border`}
        >
        <div
            className="flex gap-4 items-start border-b dark:border-b-gray-600 pb-4" 
            onClick={selectService(index)}
        >
            <span className="p-2 rounded border">
            <Sparkles size={23} />
            </span>
            <div>
            <p className='mb-2'>{service.title}</p>
            <p className='text-sm text-gray-400'><TruncateText text={service.resume} length={85} /></p>
            </div>
        </div>
        <div className="flex justify-between text-gray-400 text-sm pt-4">
            <span>{CATEGORY_LABELS[category]}</span>
            <span>Sur devis</span>
        </div>
        </div>
      ))}
    </>
  )
}

export default SelectedService