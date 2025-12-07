import type { ReactElement } from 'react'
import type { HighlightWordsProps } from '@/constants/interfaces'

const HighlightWords = (
  {
    className = '',
    text,
    options = { odd: true }
  }: HighlightWordsProps
): ReactElement => {
  const words = text.split(' ')

  return (
    <span className={className}>
      {words.map((word, index) => {
        const shouldHighlight = options.indexes
          ? options.indexes.includes(index)
          : options.odd
            ? index % 2 === 0
            : index % 2 !== 0

        return (
          <span key={index}>
            {shouldHighlight ? (
              <b className='text-[color:var(--green-light)]'>
                {word}
              </b>
            ) : (
              word
            )}
            {index < words.length - 1 && ' '}
          </span>
        )
      })}
    </span>
  )
}

export default HighlightWords
