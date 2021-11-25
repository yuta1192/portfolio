class CareersController < ApplicationController
  def index
    data = Career.order(year: :desc).order(month: :desc)
    render json: data
  end
end
