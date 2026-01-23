"use client";

import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import CopyIcon from "../ui/icons/copy-icon";

const CopyLink = ({ link }: { link: string }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(link).then(() => {
      console.log("Link copied to clipboard");
    });
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={handleCopy}
          aria-label="Copy link to clipboard"
        >
          <CopyIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Copy Link</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default CopyLink;