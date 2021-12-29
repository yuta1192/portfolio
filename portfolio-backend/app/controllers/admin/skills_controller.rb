class Admin::SkillsController < ApplicationController
  def index
    skills = Skill.all

    render json: skills
  end

  def new
    skill = Skill.new

    render json: skill
  end

  def edit
    skill = Skill.find(params[:id])

    render json: skill
  end

  def update
    skill = Skill.find(params[:id])
    if skill.update!(skill_params)
      render json: nil, status: :ok
    else
      render json: skill.errors, status: :unprocessable_entity
    end
  end

  def create
    skill = Skill.new(skill_params)
    if skill.save!
      render json: nil, status: :ok
    else
      render json: skill.errors, status: :unprocessable_entity
    end
  end

  def destroy
    skill = Skill.find(params[:id])
    if skill.destroy!
      render json: nil, status: :ok
    else
      render json: skill.errors, status: :unprocessable_entity
    end
  end

  private

  def skill_params
    params.require(:skill).permit(:id, :name, :kind, :image)
  end
end
