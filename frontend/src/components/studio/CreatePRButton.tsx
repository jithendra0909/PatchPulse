import React from 'react';
import { Rocket, ChevronRight } from 'lucide-react';

interface CreatePRButtonProps {
  prNumber?: number;
  branchName?: string;
  onApprove?: () => void;
  isLoading?: boolean;
}

export const CreatePRButton: React.FC<CreatePRButtonProps> = ({
  prNumber = 104,
  branchName = 'auto-fix/checkout-null-payload',
  onApprove,
  isLoading = false,
}) => {
  return (
    <div className="w-full">
      <button
        onClick={onApprove}
        disabled={isLoading}
        className="w-full group relative bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3 px-6 rounded-lg shadow-xl shadow-emerald-950/50 hover:shadow-emerald-500/20 border border-emerald-400/40 transition-all flex flex-col items-center justify-center cursor-pointer select-none active:scale-[0.99] disabled:opacity-50"
      >
        <div className="flex items-center space-x-2 text-base font-extrabold tracking-wide">
          <Rocket className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
          <span>Approve & Create GitHub PR #{prNumber}</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </div>
        <span className="text-[11px] font-normal text-emerald-100 opacity-90 mt-0.5 font-mono">
          This will create a PR to branch: {branchName}
        </span>
      </button>
    </div>
  );
};
