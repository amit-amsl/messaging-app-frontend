export default function ChatSkeletonView() {
  return (
    <div className="md:min-w-[508px] h-[calc(100%-64px)] md:h-full w-full flex flex-col justify-between">
      <div className="h-16 flex-shrink-0 p-4 bg-base-200 border-b-2 flex gap-2 items-center ">
        <div className="skeleton h-5 w-5 animate-pulse rounded-none"></div>
        <div className="skeleton h-5 w-16 animate-pulse"></div>
      </div>
      <div className="h-full flex flex-col gap-2 px-2 overflow-y-auto scroll-smooth">
        <div className="mx-auto font-bold text-center my-2 ">
          <div className="skeleton h-4 w-16 animate-pulse"></div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble bg-base-200">
            <div className="flex flex-col items-end gap-2">
              <div>
                <div className="skeleton h-10 w-48 animate-pulse rounded-md"></div>
              </div>
              <time className="text-xs">
                <div className="skeleton h-4 w-6 animate-pulse rounded-md"></div>
              </time>
            </div>
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble bg-base-200">
            <div className="flex flex-col items-end gap-2">
              <div>
                <div className="skeleton h-10 w-48 animate-pulse rounded-md"></div>
              </div>
              <time className="text-xs">
                <div className="skeleton h-4 w-6 animate-pulse rounded-md"></div>
              </time>
            </div>
          </div>
        </div>
        <div className="chat chat-start">
          <div className="chat-bubble bg-base-200">
            <div className="flex flex-col items-end gap-2">
              <div>
                <div className="skeleton h-10 w-48 animate-pulse rounded-md"></div>
              </div>
              <time className="text-xs">
                <div className="skeleton h-4 w-6 animate-pulse rounded-md"></div>
              </time>
            </div>
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble bg-base-200">
            <div className="flex flex-col items-end gap-2">
              <div>
                <div className="skeleton h-10 w-48 animate-pulse rounded-md"></div>
              </div>
              <time className="text-xs">
                <div className="skeleton h-4 w-6 animate-pulse rounded-md"></div>
              </time>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
