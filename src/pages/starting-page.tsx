import BlockLoader from '../components/block-loader';
import type { BaseBlock } from '../types/blocks';

export default function StartingPage() {

  const blocks: BaseBlock[] = [
    {
      id: 'main-navigation',
      type: 'navigation',
      data: {
        logoIcon: 'Box',
        // logoText: 'fm-block-logic',
        links: [
          {
            text: 'Home',
            url: '/',
            icon: 'Home'
          },
          {
            text: 'Services',
            url: '/services',
            icon: 'Briefcase',
            // subLinks: [
            //   {
            //     text: 'Traueranzeigen',
            //     url: '/services/anzeigen',
            //     icon: 'FileText'
            //   },
            //   {
            //     text: 'Gedenkseiten',
            //     url: '/services/gedenkseiten',
            //     icon: 'Heart'
            //   },
            //   {
            //     text: 'Kondolieren',
            //     url: '/services/kondolieren',
            //     icon: 'MessageCircle'
            //   }
            // ]
          },
        ]
      }
    },
    {
      id: 'hero-2',
      type: 'hero',
      data: {
        title: 'fm-block-logik',
        subtitle: 'with support for typescript and dynamic content',
        alignment: 'center',
      }
    }
  ]

  return (
    <>
      <BlockLoader blocks={blocks} />
    </>
    
  )
}