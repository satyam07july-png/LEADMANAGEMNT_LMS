import { Inbox } from "lucide-react";

const EmptyState = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Inbox size={48} className="text-gray-300" />

      <h3 className="mt-4 text-lg font-semibold text-gray-700">
        {title}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        {subtitle}
      </p>
    </div>
  );
};

export default EmptyState;