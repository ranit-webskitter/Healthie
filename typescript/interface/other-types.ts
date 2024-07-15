type Inputs = {
  first_name?: string,
  last_name?:string | null,
  email?:string,
  username?:string | null,
  phone?: string | null,
  password?: string | null,
  confirm_password?: string | null

  };

  type errorData={
    message: string,
    statusCode:number
  }
  type errorResponse={
    data: errorData[],
    
  }
  type errorType={
    response: errorResponse[]
  }

export interface PageContent {
  main_headline?: string;
  sub_headline?: string;
  home_page_banner_logo:string;
  introduction_heading_image?:string;
  banner_heading?:string;
  banner_sub_heading?:string;
  who_we_are_image?:string;
  who_we_are?:string;
  contact_a_licensed_agent_image?:string;
  contact_a_licensed_agent_phone?:string;
  fb_link?:string;
  insta_link?:string;
  twitter_link?:string;
  
}

export interface USP {
  title: string;
  description: string;
  photo: string;
}

export interface DetailedBenefit {
  title: string;
  photo: string;
  benifit_array: string[];
}

export interface TeamMember {
  name: string;
  designation: string;
  profile_photo_path: string;
  fb_link?: string;
  insta_link?: string;
  linkedin_link?: string;
  thread_link?:string;
}

export interface HomePageContent {
  pageContents: PageContent;
  usps: USP[];
  detailedBenifits: DetailedBenefit[];
  aboutusTeamDetails: TeamMember[];
}

export interface ContactData {
  states: contactState[]
}

export interface contactState {
  id?: number
  state_name?: string
  state_code?: string
  slug?: string
  phone?: string
  click_count?: number
  active?: number
  created_at?: any
  updated_at?: string
 
}


export interface ContactRoot {
  success?: boolean
  statusCode?: number
  message?: string
  data?: ContactDataData
}

export interface ContactDataData {
  firstname?: string[]
  lastname?: string[]
  phone?: string[]
  state?: string[]
}