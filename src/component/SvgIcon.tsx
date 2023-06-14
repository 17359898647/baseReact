import { Icon } from '@iconify/react'
import { isNumber } from 'lodash-es'
import type { MouseEvent } from 'react'

interface SvgIconProps {
  lineIcon?: string | null
  localIcon?: string | null
  className?: string
  color?: string
  rotate?: 0 | 1 | 2 | 3
  onClick?: (e: MouseEvent) => void
  size?: number | string
}

export function SvgIcon({ lineIcon, localIcon, className, color, rotate = 0, onClick, size = '1rem' }: SvgIconProps) {
  const iconName = useMemo(() => {
    return localIcon ?? lineIcon!
  }, [localIcon, lineIcon])
  const _size = useMemo(() => {
    return isNumber(size)
      ? {
        width: `${size}px`,
        height: `${size}px`,
      }
      : {
        width: size,
        height: size,
      }
  }, [size])
  return (
    <div
      className={`${className ?? ''} anticon anticon-desktop ant-menu-item-icon`}
      style={{
        ..._size,
      }}
    >
      {
        localIcon
          ? (
            <svg
              aria-hidden={true}
              className={'size-full cursor-pointer'}
              onClick={onClick}
            >
              <use xlinkHref={`#${iconName}`} />
            </svg>
          )
          : (
            <Icon
              className='size-full cursor-pointer'
              color={color}
              icon={iconName}
              rotate={rotate}
              onClick={onClick}
            />
          )

      }
    </div>
  )
}
