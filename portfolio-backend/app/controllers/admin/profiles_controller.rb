class Admin::ProfilesController < ApplicationController
  def index
    profiles = Profile.all

    render json: profiles
  end

  def edit
    profile = Profile.find(params[:id])

    render json: profile
  end

  def update
    profile = Profile.find(params[:id])
    active_profile = Profile.find_by(selected: true)
    active_profile.update(selected: false) if profile != active_profile && params[:selected] == true

    if profile.update!(profile_params)
      render json: nil, status: :ok
    else
      render json: contact.errors, status: :unprocessable_entity
    end
  end

  private

  def profile_params
    params.require(:profile).permit(:name, :name_romaji, :description, :address, :birthday, :birthplace, :work, :work_address, :github_url,
                                    :twitter_url, :qiita_url, :facebook_url, :youtube_url, :instagram_url, :big_image, :small_image, :selected
    )
  end
end
