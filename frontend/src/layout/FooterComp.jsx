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

import newLogo from "../assets/image/fotorlogo.jpeg"


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
								href="/"
								// src={logo}
								src={newLogo}
								alt="Hamro Job Logo"
								name="Hamro Job"
								className="mr-2 h-full w-full sm:h-12 sm:w-12 rounded-full object-cover"
							/>

						</div>

						<p className="text-gray-300 text-justify leading-relaxed">
							Hamro Job, a premier, legally certified Human Resource consulting firm since
							2014, operates with unwavering ethics, prioritizing client value. This commitment
							resonates as it navigates the professional landscape, addressing both
							"Job Vacancies in Nepal" and the specific dynamics of "Jobs in Kathmandu".
						</p>
					</div>


					<div className="grid grid-cols-3 ml-9 gap-8 w-full md:w-[50%] lg:w-[60%]">

						<div>
							<FooterTitle title="About" />
							<FooterLinkGroup col>
								<FooterLink href="/jobseeker">JobSeekers</FooterLink>
								<FooterLink href="/employer">Employers</FooterLink>
							</FooterLinkGroup>
						</div>

						<div>
							<FooterTitle title="Follow us" />
							<FooterLinkGroup col>
								<FooterLink href="https://github.com/BikramGyawali/">Github</FooterLink>
								<FooterLink href="https://facebook.com/BikramGyawali/">Facebook</FooterLink>
							</FooterLinkGroup>
						</div>

						{/* <div>
							<FooterTitle title="Legal" />
							<FooterLinkGroup col>
								<FooterLink href="#">Privacy Policy</FooterLink>
								<FooterLink href="#">Terms & Conditions</FooterLink>
							</FooterLinkGroup>
						</div> */}

						<div>
							<FooterTitle title="Quick Links" />
							<FooterLinkGroup col>
								<FooterLink href="/contact">Contact Us</FooterLink>
								<FooterLink href="/about">About Us</FooterLink>
							</FooterLinkGroup>
						</div>

					</div>
				</div>

				<FooterDivider />

				{/* BOTTOM COPYRIGHT + ICONS */}
				<div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
					<FooterCopyright href="/home" by="Hamro Job™" year={currentYear} />

					<div className="flex space-x-6 mr-6">
						<FooterIcon href="https://facebook.com/BikramGyawali/" icon={BsFacebook} />
						<FooterIcon href="https://instagram.com/" icon={BsInstagram} />
						<FooterIcon href="https://twiter.com/" icon={BsTwitter} />
						<FooterIcon href="https://github.com/BikramGyawali/" icon={BsGithub} />
						{/* <FooterIcon href="https://github.com/" icon={BsDribbble} /> */}
					</div>
				</div>
			</div>
		</Footer>
	);
}
