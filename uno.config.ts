import { defineConfig, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [presetUno()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  shortcuts: {
    'wh-full': 'w-full h-full relative',
    'red': 'border-red-500 border-solid border',
    'flex-center': 'flex justify-center items-center',
    'size-full': 'w-full h-full',
    'size-auto': 'w-auto h-auto',
    'baseAnimation': 'transition-all duration-200 ease-in-out',
  },
  rules: [
    [
      /^size-(\d+)$/,
      ([, d]) => {
        if (d.includes('px'))
          return { width: `${Number(d)}px`, height: `${Number(d)}px` }
        return { width: `${Number(d) / 4}rem`, height: `${Number(d) / 4}rem` }
      },
      { autocomplete: ['size-<num>'] },
    ],
    [
      /^size-(\d+)[a-z]+$/,
      ([o]) => {
        const unit = o.slice(o.indexOf('-') + 1)
        return { width: `${unit}`, height: `${unit}` }
      },
      { autocomplete: ['size-<num>px'] },
    ],
  ],
})
