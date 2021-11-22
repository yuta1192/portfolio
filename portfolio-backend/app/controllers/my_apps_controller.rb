class MyAppsController < ApplicationController
  def index
    @apps = MyApp.all

    render json: @apps
  end
end
