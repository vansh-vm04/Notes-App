

export default function Divider() {
  return (
    <div className="flex items-center my-6">
      <div className="flex-grow h-px bg-gray-300"></div>
      <span className="px-3 text-gray-500 text-sm">OR</span>
      <div className="flex-grow h-px bg-gray-300"></div>
    </div>
  );
}