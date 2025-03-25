import ImplantIcon from '@/icons/Implant'
import ToothIcon from '@/icons/Tooth'
import ToothBrushIcon from '@/icons/ToothBrush'

export const SERVICES = [
  // 1
  {
    title: [
      'імпланти', 
      'пародонтологія', 
      'стоматологічна', 
      'хірургія'
    ],

    description: 'лише перевірені технології та матеріали',
    descriptionOptions: {
      indexes: [1]
    },
    icon: ImplantIcon
  },
  
  // 2
  {
    title: [
      'реставрація', 
      'зубів', 
      'профілактика', 
      'гігієна'
    ],

    description: 'висока якість та надійність результату',
    descriptionOptions: {
      indexes: [0, 3]
    },
    icon: ToothIcon
  },

  // 3
  {
    title: [
      'вініри', 
      'коронки', 
      'протезування', 
      'зуботехніка'
    ],

    description: 'естетика та комфорт для вашої посмішки',
    descriptionOptions: {
      indexes: [4, 5]
    },
    icon: ToothBrushIcon
  }
]

export const SERVICES_LINE_TEXT = 'тільки лікарі вищої категорії'

