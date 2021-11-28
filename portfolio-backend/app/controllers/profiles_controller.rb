class ProfilesController < ApplicationController
  def index
    profile = Profile.where(selected: true).first

    render json: profile
  end
end
