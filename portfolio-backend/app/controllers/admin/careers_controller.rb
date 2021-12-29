class Admin::CareersController < ApplicationController
  def index
    careers = Career.all.order(year: :desc).order(month: :desc)

    render json: careers
  end

  def new
    career = Career.new

    render json: career
  end

  def edit
    career = Career.find(params[:id])

    render json: career
  end

  def update
    career = Career.find(params[:id])
    if career.update!(career_params)
      render json: nil, status: :ok
    else
      render json: career.errors, status: :unprocessable_entity
    end
  end

  def create
    career = Career.new(career_params)
    if career.save!
      render json: nil, status: :ok
    else
      render json: career.errors, status: :unprocessable_entity
    end
  end

  def destroy
    career = Career.find(params[:id])
    if career.destroy!
      render json: nil, status: :ok
    else
      render json: career.errors, status: :unprocessable_entity
    end
  end

  private

  def career_params
    params.require(:career).permit(:id, :description, :year, :month)
  end
end
