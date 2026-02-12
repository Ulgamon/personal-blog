import { useState, useRef, useEffect } from 'react';
import { Share2, Check, Link as LinkIcon } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/app/components/ui/popover';
import { Input } from '@/app/components/ui/input';
import { copyToClipboard } from '@/app/utils/clipboard';

interface SharePopoverProps {
  url: string;
  title?: string;
}

export function SharePopover({ url, title }: SharePopoverProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopyLink = async () => {
    const success = await copyToClipboard(url);
    
    if (success) {
      setCopied(true);
      
      // Select the input text for visual feedback
      if (inputRef.current) {
        inputRef.current.select();
      }
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } else {
      // If copying failed, at least select the text so user can manually copy
      if (inputRef.current) {
        inputRef.current.select();
        inputRef.current.focus();
      }
    }
  };

  const handleShareTwitter = () => {
    const tweetText = title ? `Check out: ${title}` : '';
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(tweetText)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShareLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
  };

  // Reset copied state when popover closes
  useEffect(() => {
    if (!open) {
      setCopied(false);
    }
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-[--radius-md] border border-[--color-border-default] bg-[--color-bg-primary] hover:bg-[--color-bg-secondary] transition-colors duration-200 cursor-pointer"
          aria-label="Share this post"
          type="button"
        >
          <Share2 className="h-4 w-4 text-[--color-text-secondary]" />
          <span className="text-sm text-[--color-text-secondary]">Share</span>
        </button>
      </PopoverTrigger>
      
      <PopoverContent 
        align="end" 
        className="w-80 p-0 bg-[--color-bg-primary] border-[--color-border-default] shadow-lg"
        sideOffset={8}
      >
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-[--color-text-primary]">
              Share this post
            </h3>
            <p className="text-xs text-[--color-text-tertiary]">
              Copy the link or share on social media
            </p>
          </div>

          {/* URL Input */}
          <div className="space-y-2">
            <label htmlFor="share-url" className="text-xs font-medium text-[--color-text-secondary]">
              Post URL
            </label>
            <div className="relative">
              <Input
                ref={inputRef}
                id="share-url"
                type="text"
                value={url}
                readOnly
                className="pr-10 text-sm bg-[--color-bg-secondary] border-[--color-border-default] text-[--color-text-primary] cursor-text select-all"
                onClick={(e) => {
                  e.currentTarget.select();
                }}
                onFocus={(e) => {
                  e.currentTarget.select();
                }}
              />
              <LinkIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[--color-text-quaternary] pointer-events-none" />
            </div>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-[--radius-md] bg-[--color-accent-primary] hover:bg-[--color-accent-hover] text-white font-medium text-sm transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
            disabled={copied}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <LinkIcon className="h-4 w-4" />
                <span>Copy link</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[--color-border-subtle]"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[--color-bg-primary] px-2 text-[--color-text-quaternary]">
                or share via
              </span>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShareTwitter}
              className="flex-1 flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-[--radius-md] border border-[--color-border-default] bg-[--color-bg-primary] hover:bg-[--color-bg-secondary] transition-colors duration-200 cursor-pointer"
              type="button"
              aria-label="Share on X (Twitter)"
            >
              <svg className="h-4 w-4 text-[--color-text-secondary]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="text-sm text-[--color-text-secondary]">X</span>
            </button>
            
            <button
              onClick={handleShareLinkedIn}
              className="flex-1 flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-[--radius-md] border border-[--color-border-default] bg-[--color-bg-primary] hover:bg-[--color-bg-secondary] transition-colors duration-200 cursor-pointer"
              type="button"
              aria-label="Share on LinkedIn"
            >
              <svg className="h-4 w-4 text-[--color-text-secondary]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="text-sm text-[--color-text-secondary]">LinkedIn</span>
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}