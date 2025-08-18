import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return( 
    <div className="flex item-center justify-center h-screen mt-16">
      <SignUp />
    </div>
    );
}