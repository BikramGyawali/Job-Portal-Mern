"use client";

import {
	Footer,
	FooterBrand,
	FooterCopyright,
	FooterDivider,
	FooterIcon,
	FooterLink,
	FooterLinkGroup,
	FooterTitle,
} from "flowbite-react";

import {
	BsDribbble,
	BsFacebook,
	BsGithub,
	BsInstagram,
	BsTwitter,
} from "react-icons/bs";

import logo from "../assets/image/logo.png";

export function FooterComp() {
	const currentTime = new Date();
	const currentYear = currentTime.getFullYear();
	return (
		<Footer container className="!bg-gray-900 ">
			<div className="w-full">

				<div className="flex flex-col gap-10 md:flex-row md:justify-between">


					<div className="flex flex-col gap-4 w-full md:w-[50%] lg:w-[40%]">
						<div className="flex items-center gap-3">
							<FooterBrand
								href="#"
								src={logo}
								alt="Hamro Job Logo"
								name="Hamro Job"
							/>

						</div>

						<p className="text-gray-300 text-justify leading-relaxed">
							Hamro Job, a premier, legally certified Human Resource consulting firm since
							2014, operates with unwavering ethics, prioritizing client value. This commitment
							resonates as it navigates the professional landscape, addressing both
							"Job Vacancies in Nepal" and the specific dynamics of "Jobs in Kathmandu".
						</p>
					</div>


					<div className="grid grid-cols-4  gap-8 w-full md:w-[50%] lg:w-[60%]">

						<div>
							<FooterTitle title="About" />
							<FooterLinkGroup col>
								<FooterLink href="#">JobSeekers</FooterLink>
								<FooterLink href="#">Employers</FooterLink>
							</FooterLinkGroup>
						</div>

						<div>
							<FooterTitle title="Follow us" />
							<FooterLinkGroup col>
								<FooterLink href="#">Github</FooterLink>
								<FooterLink href="#">Discord</FooterLink>
							</FooterLinkGroup>
						</div>

						<div>
							<FooterTitle title="Legal" />
							<FooterLinkGroup col>
								<FooterLink href="#">Privacy Policy</FooterLink>
								<FooterLink href="#">Terms & Conditions</FooterLink>
							</FooterLinkGroup>
						</div>

						<div>
							<FooterTitle title="Quick Links" />
							<FooterLinkGroup col>
								<FooterLink href="#">Contact Us</FooterLink>
								<FooterLink href="#">About Us</FooterLink>
							</FooterLinkGroup>
						</div>

					</div>
				</div>

				<FooterDivider />

				{/* BOTTOM COPYRIGHT + ICONS */}
				<div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
					<FooterCopyright href="#" by="Hamro Job™" year={currentYear} />

					<div className="flex space-x-6">
						<FooterIcon href="#" icon={BsFacebook} />
						<FooterIcon href="#" icon={BsInstagram} />
						<FooterIcon href="#" icon={BsTwitter} />
						<FooterIcon href="#" icon={BsGithub} />
						<FooterIcon href="#" icon={BsDribbble} />
					</div>
				</div>
			</div>
		</Footer>
	);
}
