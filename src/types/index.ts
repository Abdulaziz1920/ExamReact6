export default interface Login {
  username: string;
  password: string;
}

export default interface typeEducation {
  name: string;
  description: string;
  level: string;
  startDate: string;
  endDate: string;
}

export default interface typeSkills {
  name: string;
  percent: number;
}

export default interface typeExperience {
  workName: string;
  companyName: string;
  description: string;
}

export default interface typeWorking {
  name: string;
  description: string;
  url: string;
  photo: {
    _id: string;
    name: string;
  };
}

export default interface typeSkillsAdmin {
  _id: string;
  name: string;
  percent: number;
}

export default interface typeEducationAdmin {
  level: string;
  name: string;
  description: string;
  _id: string;
}

export default interface typeExperienceAdmin {
  workName: string;
  description: string;
  companyName: string;
  _id: string;
}

export default interface typeWorkingAdmin {
  name: string;
  url: string;
  description: string;
  _id: string;
  image: string;
}