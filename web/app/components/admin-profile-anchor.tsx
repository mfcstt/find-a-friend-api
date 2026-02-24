import { AdminProfileMenu } from "~/components/admin-profile-menu"

type AdminProfileAnchorProps = {
  orgName?: string | null
  orgAddress?: string
}

export function AdminProfileAnchor({ orgName, orgAddress }: AdminProfileAnchorProps) {
  if (!orgName || !orgAddress) {
    return null
  }

  return (
    <div className="flex justify-end">
      <AdminProfileMenu orgName={orgName} orgAddress={orgAddress} />
    </div>
  )
}
