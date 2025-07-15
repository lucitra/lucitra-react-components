import { CookieConsent } from './CookieConsent'
import { COOKIE_TYPES } from './cookieTypes'

export default {
  title: 'Components/CookieConsent',
  component: CookieConsent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A GDPR-compliant cookie consent banner built with Mantine UI components. Supports customizable cookie categories, internationalization, and accessibility.'
      }
    }
  },
  argTypes: {
    onConsentChange: { action: 'consent changed' },
    translations: { control: 'object' },
    showOnMount: { control: 'boolean' },
    consentCookieName: { control: 'text' },
    consentCookieExpiry: { control: 'number' }
  }
}

const mockCookieManager = {
  setCookie: (name, value, days) => {
    console.log(`Set cookie: ${name} = ${value} (expires in ${days} days)`)
  },
  getCookie: (name) => {
    console.log(`Get cookie: ${name}`)
    return null // Always return null for demo
  },
  deleteCookie: (name) => {
    console.log(`Delete cookie: ${name}`)
  }
}

export const Default = {
  args: {
    showOnMount: true,
    cookieManager: mockCookieManager,
    onConsentChange: (preferences) => {
      console.log('User consent preferences:', preferences)
    }
  }
}

export const CustomTranslations = {
  args: {
    showOnMount: true,
    cookieManager: mockCookieManager,
    translations: {
      title: "Cookie Settings",
      description: "We use various types of cookies to improve your experience on our website. Please review and customize your preferences below.",
      acceptAll: "Accept All Cookies",
      acceptNecessary: "Essential Only",
      customize: "Customize Settings",
      savePreferences: "Save My Preferences",
      back: "← Back",
      alwaysActive: "Required",
      necessary: {
        title: "Essential Cookies",
        description: "These cookies are required for the basic functionality of our website and cannot be disabled."
      },
      functional: {
        title: "Preference Cookies",
        description: "These cookies help us remember your settings and preferences to provide a personalized experience."
      },
      analytics: {
        title: "Performance Cookies",
        description: "These cookies help us understand how visitors interact with our website by collecting anonymous information."
      },
      marketing: {
        title: "Advertising Cookies",
        description: "These cookies are used to show you relevant advertisements based on your interests."
      }
    }
  }
}

export const WithCustomPreferences = {
  args: {
    showOnMount: true,
    cookieManager: mockCookieManager,
    defaultPreferences: {
      [COOKIE_TYPES.NECESSARY]: true,
      [COOKIE_TYPES.FUNCTIONAL]: true,
      [COOKIE_TYPES.ANALYTICS]: false,
      [COOKIE_TYPES.MARKETING]: false
    }
  }
}

export const FrenchTranslations = {
  args: {
    showOnMount: true,
    cookieManager: mockCookieManager,
    translations: {
      title: "Nous utilisons des cookies",
      description: "Nous utilisons des cookies pour améliorer votre expérience de navigation, fournir du contenu personnalisé et analyser notre trafic. En cliquant sur 'Tout accepter', vous consentez à notre utilisation des cookies.",
      acceptAll: "Tout accepter",
      acceptNecessary: "Accepter uniquement les nécessaires",
      customize: "Personnaliser",
      savePreferences: "Enregistrer les préférences",
      back: "Retour",
      alwaysActive: "Toujours actif",
      necessary: {
        title: "Cookies nécessaires",
        description: "Ces cookies sont essentiels au fonctionnement du site Web et ne peuvent pas être désactivés."
      },
      functional: {
        title: "Cookies fonctionnels",
        description: "Ces cookies permettent au site Web de fournir des fonctionnalités améliorées et une personnalisation."
      },
      analytics: {
        title: "Cookies d'analyse",
        description: "Ces cookies nous permettent de compter les visites et les sources de trafic."
      },
      marketing: {
        title: "Cookies marketing",
        description: "Ces cookies peuvent être définis via notre site par nos partenaires publicitaires."
      }
    }
  }
}

export const ArabicTranslations = {
  args: {
    showOnMount: true,
    cookieManager: mockCookieManager,
    translations: {
      title: "نحن نستخدم ملفات تعريف الارتباط",
      description: "نحن نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح الخاصة بك وتقديم محتوى مخصص وتحليل حركة المرور لدينا.",
      acceptAll: "قبول الكل",
      acceptNecessary: "قبول الضروري فقط",
      customize: "تخصيص",
      savePreferences: "حفظ التفضيلات",
      back: "رجوع",
      alwaysActive: "نشط دائماً",
      necessary: {
        title: "ملفات تعريف الارتباط الضرورية",
        description: "هذه الملفات ضرورية لعمل الموقع ولا يمكن إيقافها."
      },
      functional: {
        title: "ملفات تعريف الارتباط الوظيفية",
        description: "تمكن هذه الملفات الموقع من توفير وظائف محسنة وتخصيص."
      },
      analytics: {
        title: "ملفات تعريف الارتباط التحليلية",
        description: "تسمح لنا هذه الملفات بحساب الزيارات ومصادر حركة المرور."
      },
      marketing: {
        title: "ملفات تعريف الارتباط التسويقية",
        description: "قد يتم تعيين هذه الملفات من خلال موقعنا بواسطة شركائنا الإعلانيين."
      }
    }
  }
}

export const WithoutOverlay = {
  args: {
    showOnMount: true,
    cookieManager: mockCookieManager,
    mantineProps: {
      style: {
        position: 'relative',
        maxWidth: 600,
        margin: '2rem auto'
      }
    }
  },
  decorators: [
    () => (
      <div style={{ padding: '2rem', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <div style={{ position: 'relative' }}>
          <CookieConsent
            showOnMount={true}
            cookieManager={mockCookieManager}
            mantineProps={{
              style: {
                position: 'relative',
                maxWidth: 600,
                margin: '2rem auto'
              }
            }}
          />
        </div>
      </div>
    )
  ]
}