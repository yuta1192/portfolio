class SkillsController < ApplicationController
  def index
    skills = Skill.order(kind: :desc)

    render json: skills
  end

  def show
    skills = Skill.where(kind: params[:id])

    render json: skills
  end
end
