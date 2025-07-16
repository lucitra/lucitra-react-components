import Quote from './Quote'
import { IconQuote } from '@tabler/icons-react'

export default {
  title: 'Typography/Quote',
  component: Quote,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['blue', 'green', 'red', 'yellow', 'violet', 'orange', 'teal', 'pink']
    },
    radius: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    iconSize: {
      control: 'number'
    }
  }
}

export const Default = {
  args: {
    children: 'Life is what happens when you\'re busy making other plans.',
    cite: '– John Lennon'
  }
}

export const WithCustomIcon = {
  args: {
    children: 'The only way to do great work is to love what you do.',
    cite: '– Steve Jobs',
    icon: <IconQuote />,
    color: 'teal'
  }
}

export const Colors = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Quote color="blue" cite="– Albert Einstein">
        Imagination is more important than knowledge.
      </Quote>
      <Quote color="green" cite="– Maya Angelou">
        You can't use up creativity. The more you use, the more you have.
      </Quote>
      <Quote color="red" cite="– Winston Churchill">
        Success is not final, failure is not fatal: it is the courage to continue that counts.
      </Quote>
      <Quote color="violet" cite="– Oscar Wilde">
        Be yourself; everyone else is already taken.
      </Quote>
    </div>
  )
}

export const LongQuote = {
  render: () => (
    <Quote 
      cite="– Nelson Mandela"
      color="orange"
      style={{ maxWidth: '600px' }}
    >
      There is no passion to be found playing small – in settling for a life that 
      is less than the one you are capable of living. Your playing small does not 
      serve the world. There is nothing enlightened about shrinking so that other 
      people will not feel insecure around you.
    </Quote>
  )
}

export const NoAttribution = {
  args: {
    children: 'Some quotes don\'t need attribution and can stand on their own.',
    color: 'pink'
  }
}

export const BlogQuoteExample = {
  render: () => (
    <article style={{ maxWidth: '800px' }}>
      <h2 style={{ marginBottom: '1rem' }}>Understanding Design Principles</h2>
      <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Good design is essential for creating user experiences that are both 
        functional and delightful. As one of the most influential designers 
        of our time once said:
      </p>
      <Quote 
        cite="– Dieter Rams"
        color="blue"
        style={{ margin: '2rem 0' }}
      >
        Good design is as little design as possible. Less, but better – because 
        it concentrates on the essential aspects, and the products are not 
        burdened with non-essentials.
      </Quote>
      <p style={{ marginTop: '1.5rem', lineHeight: 1.6 }}>
        This philosophy of minimalism and focus on the essential continues to 
        influence modern design practices across digital and physical products.
      </p>
    </article>
  )
}

export const InterviewQuote = {
  render: () => (
    <div style={{ maxWidth: '700px' }}>
      <h3 style={{ marginBottom: '1rem' }}>Interview with Tech Leader</h3>
      <p style={{ marginBottom: '1rem' }}>
        When asked about the future of artificial intelligence, the CEO responded:
      </p>
      <Quote 
        cite="– Sarah Chen, CEO of TechCorp"
        color="green"
        icon={<IconQuote />}
      >
        AI is not about replacing human creativity, but about augmenting it. 
        The most successful implementations will be those that enhance human 
        capabilities rather than trying to replicate them entirely.
      </Quote>
      <p style={{ marginTop: '1rem' }}>
        This perspective highlights the collaborative potential between humans and AI systems.
      </p>
    </div>
  )
}