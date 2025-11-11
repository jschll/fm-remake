import type { BlockComponentProps } from '../../types/blocks';
import type { NavigationBlockData } from '../../types/block-data';
import * as Icons from 'lucide-react';
import Button from '../ui/button';

// Type for valid Lucide icon names
type IconName = keyof typeof Icons;

// Helper function to get icon component by name
const getIcon = (iconName?: string) => {
    if (!iconName) return null;
    const IconComponent = Icons[iconName as IconName] as React.ComponentType<{ size?: number; className?: string }>;
    return IconComponent || null;
};

export default function NavigationBlock({
    id,
    data
}: BlockComponentProps<NavigationBlockData>) {

    const {
        links, logoIcon, logoText
    } = data;

    const LogoIcon = getIcon(logoIcon);

    const renderLink = (link: NavigationBlockData['links'][0], index: number) => {
        const hasDropdown = link.subLinks && link.subLinks.length > 0;
        const LinkIcon = getIcon(link.icon);
        const ChevronDown = Icons.ChevronDown;

        if (hasDropdown) {
            return (
                <div key={index}>
                    <button type="button">
                        {LinkIcon && <LinkIcon size={20} />}
                        <span>{link.text}</span>
                        <ChevronDown size={16} />
                    </button>
                    <ul>
                        {link.subLinks!.map((subLink, subIndex) => {
                            const SubLinkIcon = getIcon(subLink.icon);
                            return (
                                <li key={subIndex}>
                                    <a href={subLink.url}>
                                        {SubLinkIcon && <SubLinkIcon size={18} />}
                                        <span>{subLink.text}</span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        }

        return (
            <a key={index} href={link.url} className='navigation-link'>
                {LinkIcon && <LinkIcon size={16} />}
                <span>{link.text}</span>
            </a>
        );
    };

    return (
        <nav id={id} className='navigation'>
            <div className='navigation-brand'>
                {LogoIcon && <LogoIcon size={32} className='navigation-brand-icon' />}
                {logoText && <span className='navigation-brand-name'>{logoText}</span>}
            </div>
            <div className='navigation-links'>
                {links.map((link, index) => renderLink(link, index))}
                <Button>
                    <Icons.User size={16}/>
                    Sign up
                </Button>
            </div>

        </nav>
    )
}