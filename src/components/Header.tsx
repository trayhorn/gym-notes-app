import ProfileMenu from "./ProfileMenu";

export default function Header() {
  return (
		<header className="relative bg-accent p-4">
			<h1 className="flex-1 font-roboto text-text-primary text-3xl font-bold">
				Gym Notes
			</h1>
			<ProfileMenu />
		</header>
	);
}