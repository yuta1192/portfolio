class UsersController < ApplicationController
  def user_select
    user = User.find_by(email: params[:credentials][:email])
    unless user && user.valid_password?(params[:credentials][:password])
      user = nil
    end

    render json: user
  end
end
