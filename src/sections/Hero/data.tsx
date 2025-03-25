import Location from '@/icons/Location'
import Phone from '@/icons/Phone'

export const HERO_TEXT = {
  firstTitle: 'Добра',
  secondTitle: 'Стоматологія',
  subtitle: 'Індивідуальний підхід до кожного зуба'
}

export const HERO_CONTACTS = [
  {
    icon: <Location className='landscape:2xl:w-[48px] landscape:2xl:h-[48px]' />,
    label: 'м. Харків, вул. Лебединська, 3',
    path: 'https://maps.app.goo.gl/5N2yYJDEUrGdgkR38'
  },
  {
    icon: <Phone className='landscape:2xl:w-[48px] landscape:2xl:h-[48px]' />,
    label: '(067)-57-44-888',
    path: 'tel:+380675744888'
  }
]