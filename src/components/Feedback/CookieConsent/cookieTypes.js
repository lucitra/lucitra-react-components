// Cookie types constants
export const COOKIE_TYPES = {
  NECESSARY: 'necessary',
  FUNCTIONAL: 'functional',
  ANALYTICS: 'analytics',
  MARKETING: 'marketing'
}

// Default translations (English)
export const DEFAULT_TRANSLATIONS = {
  title: "We use cookies",
  description: "We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking 'Accept All', you consent to our use of cookies.",
  acceptAll: "Accept All",
  acceptNecessary: "Accept Necessary Only",
  customize: "Customize",
  savePreferences: "Save Preferences",
  back: "Back",
  alwaysActive: "Always Active",
  necessary: {
    title: "Necessary Cookies",
    description: "These cookies are essential for the website to function and cannot be switched off. They are usually only set in response to actions made by you."
  },
  functional: {
    title: "Functional Cookies",
    description: "These cookies enable the website to provide enhanced functionality and personalization, such as remembering your language preference."
  },
  analytics: {
    title: "Analytics Cookies",
    description: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site."
  },
  marketing: {
    title: "Marketing Cookies",
    description: "These cookies may be set through our site by our advertising partners to build a profile of your interests."
  }
}

// Default cookie manager
export const DEFAULT_COOKIE_MANAGER = {
  setCookie: (name, value, days = 365) => {
    const date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; SameSite=Lax`
  },
  
  getCookie: (name) => {
    const nameEQ = name + "="
    const cookies = document.cookie.split(';')
    
    for (let cookie of cookies) {
      cookie = cookie.trim()
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length)
      }
    }
    return null
  },
  
  deleteCookie: (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  }
}