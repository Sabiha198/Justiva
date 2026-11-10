import ProfileForm from "../../components/account/ProfileForm";
import { currentAuthority } from "../../data/authorities";

export default function AuthorityProfilePage() {
  return (
    <ProfileForm
      title="Profile"
      initialValues={{
        name: currentAuthority.name,
        email: "r.chowdhury@police.gov.bd",
        phone: "+880 1911-000000",
        city: currentAuthority.city,
      }}
    />
  );
}
