class Admin::MyAppsController < ApplicationController
  def index
    apps = MyApp.all

    render json: apps
  end

  def new
    app = MyApp.new

    render json: app
  end

  def edit
    app = MyApp.find(params[:id])

    render json: app
  end

  def update
    app = MyApp.find(params[:id])
    if app.update!(app_params)
      render json: nil, status: :ok
    else
      render json: app.errors, status: :unprocessable_entity
    end
  end

  def create
    app = MyApp.new(app_params)
    if app.save!
      render json: nil, status: :ok
    else
      render json: app.errors, status: :unprocessable_entity
    end
  end

  def destroy
    app = MyApp.find(params[:id])
    if app.destroy!
      render json: nil, status: :ok
    else
      render json: app.errors, status: :unprocessable_entity
    end
  end

  private

  def app_params
    params.require(:my_app).permit(:name, :description, :url, :image)
  end
end
