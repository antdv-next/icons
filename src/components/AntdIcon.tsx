import type { IconDefinition } from '@ant-design/icons-svg/lib/types'
import type { IconBaseProps } from './Icon'

import type { TwoToneColor } from './twoTonePrimaryColor'
import { blue } from '@ant-design/colors'
import { classNames } from '@v-c/util'
import { defineComponent } from 'vue'
import { normalizeTwoToneColors } from '../utils.ts'
import { useIconContext } from './Context.tsx'
import IconBase from './IconBase'
import { getTwoToneColor, setTwoToneColor } from './twoTonePrimaryColor'

export interface AntdIconProps extends IconBaseProps {
  twoToneColor?: TwoToneColor
  onClick?: (e: MouseEvent) => void
  tabIndex?: number

}

export interface IconComponentProps extends AntdIconProps {
  icon: IconDefinition
}

// Initial setting
// should move it to antd main repo?
setTwoToneColor(blue.primary!)

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/34757#issuecomment-488848720
interface IconBaseComponent {
  getTwoToneColor: typeof getTwoToneColor
  setTwoToneColor: typeof setTwoToneColor
}

const Icon = defineComponent<IconComponentProps>(
  (props, { attrs }) => {
    const iconContext = useIconContext()
    return () => {
      const {
        // affect inner <svg>...</svg>
        icon,
        spin,
        rotate,
        onClick,
        tabIndex,
        // other
        twoToneColor,

        ...restProps
      } = props
      const { prefixCls = 'anticon', rootClass } = iconContext.value
      const classString = classNames(
        rootClass,
        prefixCls,
        {
          [`${prefixCls}-${icon.name}`]: !!icon.name,
          [`${prefixCls}-spin`]: !!spin || icon.name === 'loading',
        },
      )
      let iconTabIndex = tabIndex
      if (iconTabIndex === undefined && onClick) {
        iconTabIndex = -1
      }

      const svgStyle = rotate
        ? {
            msTransform: `rotate(${rotate}deg)`,
            transform: `rotate(${rotate}deg)`,
          }
        : undefined

      const [primaryColor, secondaryColor] = normalizeTwoToneColors(twoToneColor)
      const restAttrs = { ...attrs }
      delete restAttrs.class
      return (
        <span
          role="img"
          aria-label={icon.name}
          {...restProps}
          {...restAttrs}
          tabindex={iconTabIndex}
          onClick={onClick}
          class={[classString, attrs.class]}
        >
          <IconBase
            icon={icon}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            style={svgStyle}
          />
        </span>
      )
    }
  },
  {
    inheritAttrs: false,
  },
)

const AntdIcon = Icon as unknown as typeof Icon & IconBaseComponent

AntdIcon.getTwoToneColor = getTwoToneColor
AntdIcon.setTwoToneColor = setTwoToneColor

export default AntdIcon
