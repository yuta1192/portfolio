class UsersController < ApplicationController
  def show
    user = User.find_by(email: params[:emial], encrypted_password: params[:password])

    render json: user
  end
end
