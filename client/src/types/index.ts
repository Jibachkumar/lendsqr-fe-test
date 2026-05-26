interface UserProfile {
  bvn: string;
  children: string;
  gender: string;
  maritalStatus: string;
  tier: number;
  typeOfResidence: string;
}
interface UserGuarantor {
  email: string;
  fullName: string;
  phoneNumber: string;
  relationship: string;
}

interface UserSocials {
  facebook: string;
  instagram: string;
  twitter: string;
}

interface UserEducation {
  duration: string;
  employmentStatus: string;
  level: string;
  loanRepayment: string;
  sector: string;
  officeEmail: string;
  monthlyIncome: string[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  organization: string;
  dateJoined: string;
  profile: UserProfile;
  guarantor: UserGuarantor;
  accountBalance: string;
  accountNumber: string;
  socials: UserSocials;
  education: UserEducation;
  status: string;
}
