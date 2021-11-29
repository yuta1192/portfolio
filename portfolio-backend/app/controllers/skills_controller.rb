class SkillsController < ApplicationController
  def index
    skills = Skill.order(kind: :desc)

    render json: skills
  end

  def search(params)
    skills = Skill.where(kind: params)

    render json: skills
  end
end
