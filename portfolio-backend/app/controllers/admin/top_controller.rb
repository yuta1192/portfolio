class Admin::TopController < ApplicationController
  def index
    profile_count = Profile.count
    app_count = MyApp.count
    qiita_count = Qiita.count
    skill_count = Skill.count
    career_count = Career.count

    data =
    [
      {
        name: "profile",
        count: profile_count,
      },
      {
        name: "app",
        count: app_count,
      },
      {
        name: "qiita",
        count: qiita_count,
      },
      {
        name: "skill",
        count: skill_count,
      },
      {
        name: "career",
        count: career_count,
      },
    ]

    render json: data
  end
end
