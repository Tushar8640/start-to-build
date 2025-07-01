
export default function ChatApp() {


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 w-full">
      <div className="text-center max-w-md mx-auto">
        {/* Illustration */}
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
            <div className="relative">
              {/* Main chat bubble */}
              <div className="w-16 h-12 bg-purple-600 rounded-lg relative">
                {/* Chat lines */}
                <div className="absolute top-2 left-2 right-2 space-y-1">
                  <div className="h-0.5 bg-white rounded"></div>
                  <div className="h-0.5 bg-white rounded w-3/4"></div>
                  <div className="h-0.5 bg-white rounded w-1/2"></div>
                </div>
              </div>

              {/* Secondary chat bubble */}
              <div className="w-12 h-9 bg-purple-400 rounded-lg absolute -bottom-2 -right-2">
                <div className="absolute top-1.5 left-1.5 right-1.5 space-y-0.5">
                  <div className="h-0.5 bg-white rounded"></div>
                  <div className="h-0.5 bg-white rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold text-gray-900">No Message head is selected!</h1>
          <p className="text-gray-600 leading-relaxed">
            No chat is currently selected. Please select a conversation from the list to view its message details and
            continue the discussion.
          </p>
        </div>
      </div>
    </div>
  )
}
function useEffect(arg0: () => () => void, arg1: never[]) {
  throw new Error("Function not implemented.")
}

