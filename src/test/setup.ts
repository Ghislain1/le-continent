import '@testing-library/jest-dom'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import de from '../locales/de.json'
import fr from '../locales/fr.json'
import en from '../locales/en.json'

i18n.use(initReactI18next).init({
  resources: { de: { translation: de }, fr: { translation: fr }, en: { translation: en } },
  fallbackLng: 'de',
  interpolation: { escapeValue: false },
})

class MockIntersectionObserver {
  observe = () => {}
  unobserve = () => {}
  disconnect = () => {}
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
})

Object.defineProperty(window, 'scrollTo', {
  writable: true,
  configurable: true,
  value: () => {},
})
